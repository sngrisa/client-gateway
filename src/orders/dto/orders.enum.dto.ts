
export enum OrderStatus {
    PENDING,
    DELIVERED,
    CANCELLED,
}

export const OrderStatusList: OrderStatus[] = [
    OrderStatus.PENDING,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED,
];