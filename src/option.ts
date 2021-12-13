import { Result,Ok,Err } from "./result.ts";

export class Option<T> {
    private value!: T;
    constructor(value: T) {
        this.value = value;
    }

    /**
     * Returns true if the option is a Some value.
     * @returns true if the option is Some
     */
    public is_some(): boolean {
        return this.value !== undefined;
    }

    /**
     * Returns true if the option is a None value.
     * @returns true if the option is None
     */
    public is_none(): boolean {
        return !this.is_some();
    }

    public contains<U>(value: U): boolean {
        return this.is_some() && ((this.value as any) === value);
    }

    public unwrap(): T {
        if (!this.is_some()) {
            throw new Error("Cannot unwrap on None");
        }
        return this.value;
    }

    public unwrap_or(default_value: T): T {
        if (!this.is_some()) {
            return default_value;
        }
        return this.value;
    }

    public unwrap_or_else(f: () => T): T {
        return this.is_none() ? f() : this.value;
    }

    public map<U>(f: (value: T) => U): Option<U> {
        return this.is_none() ? None() : Some(f(this.value));
    }

    public map_or<U>(default_value: U, f: (value: T) => U): U {
        return this.is_none() ? default_value : f(this.value);
    }

    public map_or_else<U>(f: () => U, g: (value: T) => U): U {
        return this.is_none() ? f() : g(this.value);
    }

    public ok_or<E>(err: E): Result<T, E> {
        return this.is_some() ? Ok(this.value) : Err(err);
    }

    public ok_or_else<E>(f: () => E): Result<T, E> {
        return this.is_some() ? Ok(this.value) : Err(f());
    }

    public and<U>(optb: Option<U>): Option<U> {
        return this.is_none() ? None() : optb;
    }

    public and_then<U>(f: (value: T) => Option<U>): Option<U> {
        return this.is_none() ? None() : f(this.value);
    }

    public or(opt: Option<T>): Option<T> {
        return this.is_none() ? opt : this;
    }

    public or_else(f: () => Option<T>): Option<T> {
        return this.is_none() ? f() : this;
    }

    public filter(f: (value: T) => boolean): Option<T> {
        return this.is_none() ? None() : f(this.value) ? this : None();
    }

    public insert(value: T): T {
        this.value = value;
        return value;
    }

    public get_or_insert(value: T): T {
        if (this.is_none()) {
            this.value = value;
        }
        return this.value;
    }

    public get_or_insert_with(f: () => T): T {
        if (this.is_none()) {
            this.value = f();
        }
        return this.value;
    }

    public take(): Option<T> {
        const value = this.value;
        // @ts-ignore
        this.value = undefined;
        return Some(value);
    }

    public replace(value: T): T {
        const old_value = this.value;
        this.value = value;
        return old_value;
    }

    public zip<U>(optb: Option<U>): Option<[T, U]> {
        return this.is_none() || optb.is_none() ? None() : Some([this.value, optb.value]);
    }

    public zip_with<U, V>(optb: Option<U>, f: (a: T, b: U) => V): Option<V> {
        return this.is_none() || optb.is_none() ? None() : Some(f(this.value, optb.value));
    }

    public copied(): Option<T> {
        return this.is_some() ? Some(this.value) : None();
    }

    public cloned(): Option<T> {
        return this.is_some() ? Some(Object.assign({}, this.value)) : None();
    }

    public as_deref(): Option<T> {
        return this.is_some() ? Some(Object.freeze(this.cloned())) : None();
    }

    public as_deref_mut(): Option<T> {
        return this.is_some() ? this : None();
    }
}

export function Some<T>(value: T): Option<T> {
    return new Option(value)
}

export function None(): Option<any> {
    return new Option(null);
}
