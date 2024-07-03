export const calculateDeltaInMinutes = (createdAt: Date, readyAt?: Date) => {
    if (!readyAt) {
        return 0;
    }

    const deltaInMilliseconds = readyAt.getTime() - createdAt.getTime();

    return deltaInMilliseconds / 1000 / 60;
};

export const calculateMedian = (items: { createdAt: Date, readyAt?: Date }[]): number => {
    const delta = items.map(i => calculateDeltaInMinutes(i.createdAt, i?.readyAt));

    const sorted = delta.sort((a, b) => a - b);

    const middleIndex = Math.floor(sorted.length / 2);

    // if the number of elements is odd, return the middle element
    if (sorted.length % 2 !== 0) {
        return sorted[middleIndex];
    }

    // if the number of elements is even, return the average of the middle two elements
    return (sorted[middleIndex - 1] + sorted[middleIndex]) / 2;
}

export const calculateAverage = (items: { createdAt: Date, readyAt?: Date }[]): number => {
    const delta = items.map(i => calculateDeltaInMinutes(i.createdAt, i?.readyAt));

    const positiveValues = delta.filter(d => d > 0);

    const sum = positiveValues.reduce((acc, val) => acc + val, 0);

    return Math.round(sum / positiveValues.length);
}
