export type SortDirection = 'asc' | 'desc';

export function sortNumbers(numbers: number[], direction: SortDirection): number[] {
    return [...numbers].sort((a, b) => (direction === 'asc' ? a - b : b - a));
}
