import StatusType from "src/modules/client/orders/types/StatusType";

export default class UpdateOrderRequest {
    id: number;
    products?: number[];
    status?: StatusType; //TODO: move the type to common/shared types to a shared module
}