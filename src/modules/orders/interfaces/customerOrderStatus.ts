
export default interface CustomerOrderStatus {
    customer?: string | null;

    id: string;

    status: string;

    items: string[];
}