import { Bank } from "@src/Bank";
import { Expression } from "@src/Expression";
import { Money } from "@src/Money";

describe("simpleAddition", () => {
    test("test simple addition", () => {
        const five = Money.dollar(5);
        const sum: Expression = five.plus(five);
        const bank = new Bank();

        const reduced = bank.reduce(sum, "USD");

        expect(reduced).toEqual(Money.dollar(10));
    });
});

describe("Equality", () => {
    test("test equalities", () => {
        expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
        expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();
        expect(Money.franc(5).equals(Money.dollar(5))).toBeFalsy();
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
