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



class Vec<T> {
    private capacity: number;
    private length: number;
    private data: T[];

    private constructor(capacity: number) {
        this.capacity = capacity;
        this.length = 0;
        this.data = new Array<T>(capacity);
    }

    public push(value: T): void {
        if (this.length == this.capacity) {
            this.resize(this.capacity * 2);
        }
        this.data[this.length] = value;
        this.length += 1;
    }

    public resize(new_capacity: number): void {
        let new_data = new Array<T>(new_capacity);
        for (let i = 0; i < this.length; i++) {
            new_data[i] = this.data[i];
        }
        this.data = new_data;
        this.capacity = new_capacity;
    }

    public get(index: number): Option<T> {
        if (index >= this.length) {
            return None();
        }
        return Some(this.data[index]);
    }

    public new(elms: T[]): Vec<T> {
        let v = new Vec<T>(1024);
        for (let i = 0; i < elms.length; i++) {
            v.push(elms[i]);
        }
        return v;
    }
}