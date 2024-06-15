
export default interface OrdersStatus {
    inProgress: string[];

    ready: string[];

    // in seconds
    waitingTime?: number;
}