interface CustomerOrderInfoResponse {
    orderId: number;
    branchId: number;
    status: string;
}

export interface IdentifyCustomerOrderResponse {
    token: string;
}

export default CustomerOrderInfoResponse;