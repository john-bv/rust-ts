export class Option<T> {
    constructor(private value: T) {
        this.value = value;
    }

    public is_some(): boolean {
        return this.value != null;
    }

    public is_none(): boolean {
        return this.value == null;
    }

    public unwrap(): T {
        if (this.value == null) {
            throw new Error("Cannot unwrap on None");
        }
        return this.value;
    }

    public unwrap_or(default_value: T): T {
        if (this.value == null) {
            return default_value;
        }
        return this.value;
    }
}

export function Some<T>(value: T): Option<T> {
    return new Option(value)
}

export function None(): Option<any> {
    return new Option(null);
}
