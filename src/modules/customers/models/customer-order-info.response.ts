interface CustomerOrderInfoResponse
{
    orderId: number;
    branchId: number;
    status: string;
}

export interface IdentifyCustomerOrderResponse extends CustomerOrderInfoResponse {
    token: string;
}

export default CustomerOrderInfoResponse;