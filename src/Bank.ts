import { Expression } from "./Expression";
import { Money } from "./Money";
import { Pair } from "./Pair";

export class Bank {
    private rates = new Map<string, number>();

    public reduce(source: Expression, to: string): Money {
        return source.reduce(this, to);
    }

    public rate(from: string, to: string): number {
        if (from === to) return 1;
        const rate = this.rates.get(new Pair(from, to).id);
        return rate;
    }

    public addRate(from: string, to: string, rate: number): void {
        this.rates.set(new Pair(from, to).id, rate);
    }
}
