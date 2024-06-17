import { calculateDeltaInSeconds, calculateMedianExecutionTime } from "./culculator.helper";

describe('calculateDeltaInSeconds', () => {
    it('should return 0 if readyAt is undefined', () => {
        const createdAt = new Date();
        expect(calculateDeltaInSeconds(createdAt)).toBe(0);
    });

    it('should correctly calculate the difference in seconds', () => {
        const createdAt = new Date('2024-01-01T12:00:00Z');
        const readyAt = new Date('2024-01-01T12:05:00Z');
        expect(calculateDeltaInSeconds(createdAt, readyAt)).toBe(300);
    });
});

describe('calculateMedianExecutionTime', () => {
    it('should return the median of an odd number of elements', () => {
        const items = [
            { createdAt: new Date('2024-01-01T12:00:00Z'), readyAt: new Date('2024-01-01T12:05:00Z') },
            { createdAt: new Date('2024-01-01T12:00:00Z'), readyAt: new Date('2024-01-01T12:06:00Z') },
            { createdAt: new Date('2024-01-01T12:00:00Z'), readyAt: new Date('2024-01-01T12:07:00Z') },
        ];
        expect(calculateMedianExecutionTime(items)).toBe(360);
    });

    it('should handle empty array', () => {
        const items: { createdAt: Date, readyAt?: Date }[] = [];
        expect(calculateMedianExecutionTime(items)).toBe(NaN);
    });

    it('should handle array with one element', () => {
        const items = [
            { createdAt: new Date('2024-01-01T12:00:00Z'), readyAt: new Date('2024-01-01T12:05:00Z') },
        ];
        expect(calculateMedianExecutionTime(items)).toBe(300);
    });
});
