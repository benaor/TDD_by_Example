import { Bank } from "./Bank";
import { Expression } from "./Expression";
import { Money } from "./Money";

export class Sum implements Expression {
    augend: Expression;
    addend: Expression;

    constructor(augend: Expression, addend: Expression) {
        this.augend = augend;
        this.addend = addend;
    }

    public reduce(bank: Bank, to: string): Money {
        const amount = this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount;
        return new Money(amount, to);
    }

    public plus(addend: Expression): Expression {
        return new Sum(this, addend);
    }

    public times(multiplier: number) {
        return new Sum(this.augend.times(multiplier), this.addend.times(multiplier));
    }
}
