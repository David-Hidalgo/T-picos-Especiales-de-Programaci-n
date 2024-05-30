// MARK: Opcional

export class Optional<T> {
    private _value: T | undefined;
    private assigned: boolean;

    constructor(value?: T) {
        if (value) {
            this._value = value;
            this.assigned = true;
        } else {
            this._value = undefined;
            this.assigned = false;
        }
    }

    public get hasValue(): boolean {
        if (this.assigned) {
            return true;
        } else {
            return false;
        }
    }

    public get value(): T {
        if (!this.assigned) throw new Error("Jodete");
        return this._value as T;
    }
}