import StatusType from "src/modules/client/orders/types/StatusType";

export default class FindOrderRequest {
    id?: number;
    productName?: string;
    status?: StatusType; //TODO: move the type to common/shared types to a shared module
}