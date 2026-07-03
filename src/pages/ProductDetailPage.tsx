import { useParams } from 'react-router-dom';

export default function ProductDetailPage() {
    const { id } = useParams();
    return <div><h1>Product {id}</h1></div>;
}