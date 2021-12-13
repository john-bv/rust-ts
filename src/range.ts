export class Range<T> {
    public start: T;
    public end: T;

    constructor(start: T, end: T) {
        this.start = start;
        this.end = end;
    }

    public contains(value: T): boolean {
        return this.start <= value && value <= this.end;
    }

    public is_empty(): boolean {
        return (this.start > this.end) || (this.start === this.end);
    }
}