import { Bank } from "@src/Bank";
import { Expression } from "@src/Expression";
import { Money } from "@src/Money";
import { Sum } from "@src/Sum";

describe("simpleAddition", () => {
    test("test simple addition", () => {
        const five = Money.dollar(5);
        const sum: Expression = five.plus(five);
        const bank = new Bank();

        const reduced = bank.reduce(sum, "USD");

        expect(reduced).toEqual(Money.dollar(10));
    });

    test("test plus return num", () => {
        const five = Money.dollar(5);
        const result: Expression = five.plus(five);
        const sum = result as Sum;

        expect(sum.augend).toEqual(five);
        expect(sum.addend).toEqual(five);
    });

    test("test reduce sum", () => {
        const sum: Expression = new Sum(Money.dollar(3), Money.dollar(4));
        const bank: Bank = new Bank();
        const result = bank.reduce(sum, "USD");

        expect(result).toEqual(Money.dollar(7));
    });

    test("test reduce Money", () => {
        const bank: Bank = new Bank();
        const result = bank.reduce(Money.dollar(1), "USD");

        expect(result).toEqual(Money.dollar(1));
    });

    test("test reduce Money different currencies", () => {
        const bank: Bank = new Bank();
        bank.addRate("CHF", "USD", 2);

        const result = bank.reduce(Money.franc(2), "USD");

        expect(result).toEqual(Money.dollar(1));
    });
});

describe("Equality", () => {
    test("test equalities", () => {
        expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
        expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();
        expect(Money.franc(5).equals(Money.dollar(5))).toBeFalsy();
    });

    test("test Identity Rate", () => {
        expect(new Bank().rate("USD", "USD")).toEqual(1);
    });
});

describe("Currencies", () => {
    test("test currencies", () => {
        expect("USD").toEqual(Money.dollar(1).currency);
        expect("CHF").toEqual(Money.franc(1).currency);
    });
});

describe("Multiplication", () => {
    test("test dollar multiplication", () => {
        const five = Money.dollar(5);
        expect(five.times(2)).toEqual(Money.dollar(10));
        expect(five.times(3)).toEqual(Money.dollar(15));
    });

    test("test franc multiplication", () => {
        const five = Money.franc(5);
        expect(five.times(2)).toEqual(Money.franc(10));
        expect(five.times(3)).toEqual(Money.franc(15));
    });
});
