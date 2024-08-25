import { fibonacciSequence } from "./index.js";

describe('fibonacciSequence', () => {
    let fibIterator;

    beforeEach(() => {
        fibIterator = fibonacciSequence();
    });

    it('初期値を確認', () => {
        expect(fibIterator.next().value).toBe(1);
        expect(fibIterator.next().value).toBe(1);
    });

    it('次の数値が正しいか確認', () => {
        fibIterator.next(); // 1
        fibIterator.next(); // 1
        expect(fibIterator.next().value).toBe(2); // 1 + 1
        expect(fibIterator.next().value).toBe(3); // 1 + 2
        expect(fibIterator.next().value).toBe(5); // 2 + 3
    });

    it('連続して10個の数値を確認', () => {
        const expectedSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
        const generatedSequence = [];
        for (let i = 0; i < 10; i++) {
            generatedSequence.push(fibIterator.next().value);
        }
        expect(generatedSequence).toEqual(expectedSequence);
    });

    it('無限ループであることを確認', () => {
        for (let i = 0; i < 1000; i++) {
            const result = fibIterator.next();
            expect(result.done).toBe(false);
            expect(typeof result.value).toBe('number');
        }
    });
});