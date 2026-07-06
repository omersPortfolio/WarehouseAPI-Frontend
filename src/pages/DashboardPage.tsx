import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import type { Product } from '../types/product';

async function fetchProducts(): Promise<Product[]> {
    const response = await apiClient.get<Product[]>('/api/products');
    return response.data;
}

export default function DashboardPage() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    if (isLoading) {
        return <div>Loading products…</div>;
    }

    if (isError) {
        return (
            <div style={{ color: 'red' }}>
                Error: {(error as Error).message}
            </div>
        );
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>{data?.length ?? 0} product(s) in the warehouse.</p>
            <ul>
                {data?.map((product) => (
                    <li key={product.id}>
                        <strong>{product.name}</strong> - ${product.price} ({product.stockQuantity} in stock)
                    </li>
                ))}
            </ul>
        </div>
    );
}