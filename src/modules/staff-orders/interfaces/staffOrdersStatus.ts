
export default interface StaffOrdersStatus {
    inProgress: string[];

    ready: string[];

    // in seconds
    waitingTime?: number;
}