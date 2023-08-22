var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FeatureSerializerBase, InferFeatureAttributesBase, } from "../base.js";
import * as utils from "../utils.js";
export class InferFeatureAttributesFromArray extends InferFeatureAttributesBase {
    constructor(dataset) {
        var _a;
        super();
        this.dataset = dataset;
        if ((_a = dataset.data) === null || _a === void 0 ? void 0 : _a.length) {
            for (const row of dataset.data) {
                if ((row === null || row === void 0 ? void 0 : row.length) !== dataset.columns.length) {
                    throw new RangeError("The shape of the dataset's rows and columns do not match. Ensure the length of each row matches the number of columns.");
                }
            }
        }
    }
    inferBoolean(_featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                type: "nominal",
                data_type: "boolean",
            };
        });
    }
    inferTimedelta(_featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                type: "continuous",
            };
        });
    }
    inferTime(_featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                type: "continuous",
            };
        });
    }
    inferDate(_featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                type: "continuous",
                date_time_format: "%Y-%m-%d",
            };
        });
    }
    inferDatetime(_featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                type: "continuous",
                date_time_format: "%Y-%m-%dT%H:%M:%SZ",
            };
        });
    }
    inferInteger(featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inferFloat(featureName);
        });
    }
    inferFloat(featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            let decimal_places = 0;
            let asNominal = false;
            const index = this.dataset.columns.indexOf(featureName);
            const column = this.dataset.data.map((x) => {
                decimal_places = Math.max(decimal_places, utils.precision(x[index]));
                return x[index];
            });
            const numUnique = new Set(column).size;
            const intLike = decimal_places === 0;
            if (decimal_places >= 15) {
                // Don't specify decimal places if using max precision of float64
                decimal_places = 0;
            }
            // Detect if column should be treated as nominal
            if (this.findFirstValue(featureName) !== undefined) {
                if (intLike) {
                    asNominal = numUnique < Math.pow(column.length, 0.5);
                }
                else {
                    asNominal = numUnique <= 2 && column.length > 10;
                }
            }
            if (asNominal) {
                return {
                    type: "nominal",
                    data_type: "number",
                    decimal_places,
                };
            }
            else {
                return {
                    type: "continuous",
                    decimal_places,
                };
            }
        });
    }
    inferString(_featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                type: "nominal",
            };
        });
    }
    inferBounds(attributes, featureName, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let hasNull = false;
            let isDate = false;
            const output = {};
            const index = this.dataset.columns.indexOf(featureName);
            const column = this.dataset.data.reduce((result, el) => {
                if (utils.isNull(el[index])) {
                    // Exclude nulls
                    hasNull = true;
                }
                else if (el[index] instanceof Date) {
                    result.push(el[index].getTime());
                    isDate = true;
                }
                else {
                    result.push(el[index]);
                }
                return result;
            }, []);
            if (attributes.type === "continuous") {
                column.sort((a, b) => a - b || Number(isNaN(a)) - Number(isNaN(b)));
                let minValue = column[0];
                let maxValue = column[column.length - 1];
                // Save original value
                const actualMin = minValue;
                const actualMax = maxValue;
                if (minValue !== undefined && maxValue !== undefined) {
                    if (!options.tightBounds ||
                        (Array.isArray(options.tightBounds) && options.tightBounds.indexOf(featureName) === -1)) {
                        // Use loose bounds
                        [minValue, maxValue] = utils.guessLooseBounds(minValue, maxValue);
                        const { modeBounds = true } = options;
                        if (modeBounds || (Array.isArray(modeBounds) && modeBounds.indexOf(featureName) >= 0)) {
                            // Check for mode bounds
                            const numUnique = new Set(column).size;
                            if (numUnique !== column.length) {
                                const [modes, modeCount] = utils.allModes(column);
                                // If the mode for the feature is same as an original bound, set that appropriate bound to the mode value
                                // since in this case, it probably represents an application-specific min/max. Only applies if there
                                // are more than 3 instances of the value.
                                if (modeCount > 3) {
                                    for (const modeValue of modes) {
                                        if (actualMin === modeValue) {
                                            minValue = actualMin;
                                        }
                                        else if (actualMax === modeValue) {
                                            maxValue = actualMax;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // Convert back to date object
                    if (isDate) {
                        minValue = new Date(minValue);
                        maxValue = new Date(maxValue);
                    }
                    // Set bounds
                    output["min"] = minValue;
                    output["max"] = maxValue;
                }
            }
            if (!hasNull) {
                output["allow_null"] = false;
            }
            if (Object.keys(output).length > 0) {
                return output;
            }
            return undefined;
        });
    }
    inferTimeSeries(_attributes, _featureName, _options) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO - infer time series
            throw new Error("Method not implemented.");
        });
    }
    inferUnique(_featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            // Arrays don't support unique constraints
            return false;
        });
    }
    getFeatureType(featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = this.findFirstValue(featureName);
            const dataType = typeof value;
            switch (dataType) {
                case "bigint":
                    throw TypeError("BigInt is not supported.");
                case "number":
                    return { data_type: "numeric", size: 8 };
                case "boolean":
                    return { data_type: "boolean" };
                case "string":
                    return { data_type: "string" };
                case "object":
                    if (value instanceof Date) {
                        return { data_type: "datetime" };
                    }
                    return { data_type: "object" };
                default:
                    return undefined;
            }
        });
    }
    findFirstValue(featureName) {
        const index = this.dataset.columns.indexOf(featureName);
        for (const row of this.dataset.data) {
            if (utils.isNull(row[index])) {
                continue;
            }
            return row[index];
        }
        return undefined;
    }
    getFeatureNames() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataset.columns || [];
        });
    }
    getNumCases() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return ((_a = this.dataset.data) === null || _a === void 0 ? void 0 : _a.length) || 0;
        });
    }
    getNumFeatures() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return ((_a = this.dataset.columns) === null || _a === void 0 ? void 0 : _a.length) || 0;
        });
    }
}
export class FeatureSerializerArrayData extends FeatureSerializerBase {
    serialize(data, _features) {
        return __awaiter(this, void 0, void 0, function* () {
            return data.data;
        });
    }
    deserialize(data, columns, features) {
        return __awaiter(this, void 0, void 0, function* () {
            const deserialized = [];
            for (const row of data) {
                const deserializedRow = [];
                if (Array.isArray(row) && row.length === columns.length) {
                    let index = 0;
                    for (const cell of row) {
                        deserializedRow.push(this.deserializeCell(cell, features === null || features === void 0 ? void 0 : features[columns[index]]));
                        index++;
                    }
                    deserialized.push(deserializedRow);
                }
                else {
                    deserialized.push([...row]);
                }
            }
            const result = {
                columns,
                data: deserialized,
            };
            return result;
        });
    }
}
