export class Result<T,E> {

    private constructor(private readonly value: T, private readonly error: E) {}

    public is_ok(): boolean {
        return this.value !== null;
    }

    public is_err(): boolean {
        return this.error !== null;
    }

    public unwrap(): Option<T> {
        if (this.is_ok()) {
            return Some(this.value);
        } else {
            return None();
        }
    }

    public unwrap_or(default: T): T {
        return this.is_ok() ? this.value : default_value;
    }

    public unwrap_or_else(op: (error: E) => T): T {
        return this.is_ok() ? this.value : op(this.error);
    }

    public map<U>(op: (value: T) => U): Result<U,E> {
        return this.is_ok() ? Ok(op(this.value)) : Err(this.error);
    }

    public map_or<U>(default: U): U {
        return Some(this.is_ok() ? this.value : default_value);
    }

    public map_or_else<U>(default: U, op: (error: E) => U): U {
        return this.is_ok() ? this.value : op(this.error);
    }

    public and<U>(res: Result<U,E>): Result<U,E> {
        return this.is_ok() ? res : Err(this.error);
    }

    public and_then<U>(op: (value: T) => Result<U,E>): Result<U,E> {
        return this.is_ok() ? op(this.value) : Err(this.error);
    }

    public or<U>(res: Result<U,E>): Result<T,E> {
        return this.is_ok() ? this : res;
    }

    public or_else<U>(op: (error: E) => Result<U,E>): Result<T,E> {
        return this.is_ok() ? this : op(this.error);
    }

    public unwrap_err(): E {
        return this.error;
    }

    public expect(message: string): T {
        if (this.is_ok()) {
            return this.value;
        } else {
            throw new Error(message);
        }
    }

    public expect_err(message: string): E {
        if (this.is_err()) {
            return this.error;
        } else {
            throw new Error(message);
        }
    }

    public ok(): Option<T> {
        return this.is_ok() ? Some(this.value) : None();
    }

}

export function Ok(value: any) {
    return new Result(value, null);
}

export function Err(error: any) {
    return new Result(null, error);
}