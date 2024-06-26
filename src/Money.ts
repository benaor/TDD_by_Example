import { Bank } from "./Bank";
import { Expression } from "./Expression";
import { Sum } from "./Sum";

export class Money implements Expression {
    protected _amount: number;
    protected _currency: string;

    constructor(amount: number, currency: string) {
        this._amount = amount;
        this._currency = currency;
    }

    public equals(money: Money): boolean {
        return this._amount === money._amount && this._currency === money.currency;
    }

    public times(multiplier: number): Expression {
        return new Money(this._amount * multiplier, this._currency);
    }

    public plus(addend: Expression): Expression {
        return new Sum(this, addend);
    }

    public reduce(bank: Bank, to: string) {
        const rate: number = bank.rate(this._currency, to);
        return new Money(this._amount / rate, to);
    }

    get currency(): string {
        return this._currency;
    }

    get amount(): number {
        return this._amount;
    }

    public static dollar(amount: number): Money {
        return new Money(amount, "USD");
    }

    public static franc(amount: number): Money {
        return new Money(amount, "CHF");
    }
}
