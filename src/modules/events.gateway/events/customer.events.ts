// TODO: Add more events as needed
const customerEvents = [
    "customer.order.created",
    "customer.order.updated",
    "customer.orders.updated",
];

type CustomerEventType = typeof customerEvents[number];

export default CustomerEventType;