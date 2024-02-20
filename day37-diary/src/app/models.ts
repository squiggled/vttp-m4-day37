export interface Diary{
    index: number,
    date: Date,
    entry: string,
    type: "travel" | "climbing" | "hobbies" | "eating"
}