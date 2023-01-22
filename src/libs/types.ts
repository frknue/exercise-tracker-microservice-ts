export interface Log {
    description: string,
    duration: number,
    date: string
}

export interface Exercise {
    username: string,
    count: number,
    log: Log[]
}
