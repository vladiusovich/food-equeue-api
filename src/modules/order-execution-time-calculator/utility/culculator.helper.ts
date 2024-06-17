export const calculateDeltaInSeconds = (createdAt: Date, readyAt?: Date) => {
    if (!readyAt) {
        return 0;
    }
    const deltaInMilliseconds = readyAt.getTime() - createdAt.getTime();
    const deltaInSeconds = deltaInMilliseconds / 1000;
    return deltaInSeconds;
};


export const calculateMedianExecutionTime = (items: { createdAt: Date, readyAt?: Date }[]): number => {
    const delta = items.map(i => calculateDeltaInSeconds(i.createdAt, i?.readyAt));

    const sorted = delta.sort((a, b) => a - b);

    const middleIndex = Math.floor(sorted.length / 2);

    // if the number of elements is odd, return the middle element
    if (sorted.length % 2 !== 0) {
        return sorted[middleIndex];
    }

    // if the number of elements is even, return the average of the middle two elements
    return (sorted[middleIndex - 1] + sorted[middleIndex]) / 2;
}