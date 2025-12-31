export declare function describeEach<T extends readonly unknown[]>(
  rows: readonly T[]
): (message: string, fn: (...row: T) => void) => void;
