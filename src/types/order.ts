// @ts-ignore
export enum OrderStatus {
    Pending = 0,
    Shipped = 1,
    Delivered = 2,
    Cancelled = 3,
}

export interface CreateOrderItemDto {
    productId: string;
    quantity: number;
}

export interface CreateOrderDto {
    customerName: string;
    items: CreateOrderItemDto[];
}

export interface UpdateOrderStatusDto {
    status: OrderStatus;
}

export interface Order {
    id: string;
    customerName: string;
    status: OrderStatus;
    items: OrderItem[];
}

export interface OrderItem {
    productId: string;
    quantity: number;
}