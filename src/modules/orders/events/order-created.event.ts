import { Order } from "../entities/order.entity";

export class OrderCreatedEvent {
    orderId: number;
    payload: Order;
    description: string;
}