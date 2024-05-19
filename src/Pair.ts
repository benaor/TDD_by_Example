export class Pair {
    private _from: string;
    private _to: string;

    constructor(from: string, to: string) {
        this._from = from;
        this._to = to;
    }

    get id(): string {
        return `${this._from}:${this._to}`;
    }
}
