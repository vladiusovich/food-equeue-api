import { calculateDeltaInSeconds, calculateMedianExecutionTime } from "./culculator.helper";

describe('calculateDeltaInSeconds', () => {
    it('should return 0 if readyAt is undefined', () => {
        const createdAt = new Date();
        expect(calculateDeltaInSeconds(createdAt)).toBe(0);
    });

    it('should correctly calculate the difference in seconds', () => {
        const createdAt = new Date('2024-01-01T12:00:00Z');
        const readyAt = new Date('2024-01-01T11:59:00Z');
        expect(calculateDeltaInSeconds(createdAt, readyAt)).toBe(60);
    });

    it('should handle negative differences', () => {
        const createdAt = new Date('2024-01-01T11:59:00Z');
        const readyAt = new Date('2024-01-01T12:00:00Z');
        expect(calculateDeltaInSeconds(createdAt, readyAt)).toBe(-60);
    });
});

describe('calculateMedianExecutionTime', () => {
    it('should return the median of an odd number of elements', () => {
        const items = [
            { createdAt: new Date('2024-01-01T12:00:00Z'), readyAt: new Date('2024-01-01T11:59:00Z') },
            { createdAt: new Date('2024-01-01T12:00:00Z'), readyAt: new Date('2024-01-01T11:58:00Z') },
            { createdAt: new Date('2024-01-01T12:00:00Z'), readyAt: new Date('2024-01-01T11:57:00Z') },
        ];
        expect(calculateMedianExecutionTime(items)).toBe(120);
    });

    it('should return the average of the middle two elements for an even number of elements', () => {
        const items = [
            { createdAt: new Date('2024-01-01T12:00:00Z'), readyAt: new Date('2024-01-01T11:59:00Z') },
            { createdAt: new Date('2024-01-01T12:00:00Z'), readyAt: new Date('2024-01-01T11:58:00Z') },
            { createdAt: new Date('2024-01-01T12:00:00Z'), readyAt: new Date('2024-01-01T11:57:00Z') },
            { createdAt: new Date('2024-01-01T12:00:00Z'), readyAt: new Date('2024-01-01T11:56:00Z') },
        ];
        expect(calculateMedianExecutionTime(items)).toBe(150);
    });

    it('should handle empty array', () => {
        const items: { createdAt: Date, readyAt?: Date }[] = [];
        expect(calculateMedianExecutionTime(items)).toBe(NaN);
    });

    it('should handle array with one element', () => {
        const items = [
            { createdAt: new Date('2024-01-01T12:00:00Z'), readyAt: new Date('2024-01-01T11:59:00Z') },
        ];
        expect(calculateMedianExecutionTime(items)).toBe(60);
    });
});
