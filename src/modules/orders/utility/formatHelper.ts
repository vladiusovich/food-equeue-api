import { Customer } from "../entities/customer.entity";

const tryFormatFullName = (customer?: Customer| null): string | null => {
    if (!customer) {
        return null;
    }

    const { firstName, lastName } = customer;

    return `${firstName} ${lastName ?? ''}`.trim();
};

export default tryFormatFullName;