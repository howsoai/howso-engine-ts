export type GetMarginalStatsResponse = {
  [key: string]: {
    /** Ex: null; */
    skew: number | null;
    /** Ex: null; */
    min: number | null;
    /** Ex: null; */
    mean: number | null;
    /** Ex: null; */
    percentile_75: number | null;
    /** Ex: 150; */
    count: number | null;
    /** Ex: null; */
    variance: number | null;
    /** Ex: null; */
    mean_absdev: number | null;
    /** Ex: null; */
    stddev: number | null;
    /** Ex: 3; */
    uniques: number | null;
    /** Ex: null; */
    median: number | null;
    /** Ex: 1.0986122886681096; */
    entropy: number | null;
    /** Ex: null; */
    kurtosis: number | null;
    /** Ex: "Iris-versicolor"; */
    mode: number | null;
    /** Ex: null; */
    max: number | null;
    /** Ex: null; */
    percentile_25: number | null;
  };
};
