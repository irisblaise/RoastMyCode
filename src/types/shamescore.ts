export interface ShameScoreProps {
    score: number;
}
  

 export interface ShameScoreFilterProps {
    currentFilter: string;
    onFilterChange: (filter: string) => void;
}