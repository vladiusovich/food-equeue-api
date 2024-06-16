import { Order } from "src/modules/orders/entities/order.entity";

export class OrderCreatedEvent {
    orderId: number;
    payload: Order;
    description: string;
}