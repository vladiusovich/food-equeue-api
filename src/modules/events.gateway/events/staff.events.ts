// TODO: Add more events as needed
const staffEvents = [
    "staff.order.created",
    "staff.order.updated",
    "staff.orders.updated",
];

type StaffEventType = typeof staffEvents[number];

export default StaffEventType;