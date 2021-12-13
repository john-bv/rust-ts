import { Option, None, Some } from "./option.ts";

export class Vec<T> {
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