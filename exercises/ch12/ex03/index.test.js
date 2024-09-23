import { counter } from './index.js';

describe('counter generator', () => {
    it('カウンタが1から始まり、next()が呼ばれるたびに1ずつ増加すること', () => {
        const gen = counter();

        // expect(gen.next().value).toBe(1);
        // expect(gen.next().value).toBe(2);
        // expect(gen.next().value).toBe(3);
        expect(gen.next().value).toBe(0);
        expect(gen.next().value).toBe(1);
        expect(gen.next().value).toBe(2);
    });

    it('カウンタを任意の回数進めた後にthrow()を呼び出し、カウンタがリセットされること', () => {
        const gen = counter();

        // expect(gen.next().value).toBe(1);
        // expect(gen.next().value).toBe(2);
        expect(gen.next().value).toBe(0);
        expect(gen.next().value).toBe(1);


        gen.throw();

        // expect(gen.next().value).toBe(1);
        // expect(gen.next().value).toBe(2);
        expect(gen.next().value).toBe(0);
        expect(gen.next().value).toBe(1);

    });

    it('カウンタを大きく進めた後にthrow()を呼び出し、カウンタがリセットされること', () => {
        const gen = counter();

        for (let i = 0; i < 10000; i++) {
            expect(gen.next().value).toBe(i);
        }

        gen.throw();

        // expect(gen.next().value).toBe(1);
        // expect(gen.next().value).toBe(2);
        expect(gen.next().value).toBe(0);
        expect(gen.next().value).toBe(1);
    });

    it('複数回リセットしてもカウンタが正しく機能すること', () => {
        const gen = counter();

        expect(gen.next().value).toBe(0);
        expect(gen.next().value).toBe(1);
        expect(gen.next().value).toBe(2);
        expect(gen.next().value).toBe(3);
        
        gen.throw(new Error('error1'));
        expect(gen.next().value).toBe(0);
        expect(gen.next().value).toBe(1);
        expect(gen.next().value).toBe(2);

        // 再リセット
        gen.throw(new Error('error2'));
        expect(gen.next().value).toBe(0);
        expect(gen.next().value).toBe(1);
        expect(gen.next().value).toBe(2);
        expect(gen.next().value).toBe(3);
        expect(gen.next().value).toBe(4);
    
    });
});