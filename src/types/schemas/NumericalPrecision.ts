/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 */

/**
 * This parameter controls the tradeoff of precision of computations for speed. This parameter takes in a string that could be one of the following:
 * a "recompute_precise": default value, will use fast computation for finding similar cases but recompute their exact similarities and influences precisely.
 * b. "precise" will always use high precision computation for finding similar cases and computing similarites and influences.
 * c. "fast" will always use a fast approach for all computations which will use faster, but lower precision numeric operations.
 * d. "fastest" same as 'fast' but will additionally use a faster approach specific for generative reacts.
 */
export type NumericalPrecision = "fast" | "fastest" | "precise" | "recompute_precise";
