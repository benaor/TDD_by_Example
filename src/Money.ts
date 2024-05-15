import { Expression } from "./Expression";

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

    public times(multiplier: number): Money {
        return new Money(this._amount * multiplier, this._currency);
    }

    public plus(addend: Money): Expression {
        return new Money(this._amount + addend._amount, this._currency);
    }

    get currency(): string {
        return this._currency;
    }

    // public toString(): string {
    //     return this._amount + " " + this._currency;
    // }

    public static dollar(amount: number): Money {
        return new Money(amount, "USD");
    }

    public static franc(amount: number): Money {
        return new Money(amount, "CHF");
    }
}