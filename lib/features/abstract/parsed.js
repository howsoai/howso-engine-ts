var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FeatureSerializerBase } from "../base.js";
import { InferFeatureAttributesFromArray } from "./arrays.js";
/**
 * Reformat array of objects to 2d array of values.
 * @param dataset The source dataset.
 * @returns The new dataset format.
 */
function parsedDataToArrayData(dataset) {
    var _a;
    const data = [];
    for (const row of dataset) {
        const item = [];
        for (const col of dataset.columns) {
            item.push((_a = row[col]) !== null && _a !== void 0 ? _a : null);
        }
        data.push(item);
    }
    return { columns: dataset.columns, data };
}
export class InferFeatureAttributesFromParsedArray extends InferFeatureAttributesFromArray {
    constructor(dataset) {
        super(parsedDataToArrayData(dataset));
    }
}
export class FeatureSerializerParsedArrayData extends FeatureSerializerBase {
    serialize(data, _features) {
        return __awaiter(this, void 0, void 0, function* () {
            return parsedDataToArrayData(data).data;
        });
    }
    deserialize(data, columns, features) {
        return __awaiter(this, void 0, void 0, function* () {
            const deserialized = Object.assign([], { columns });
            for (const row of data) {
                const deserializedRow = {};
                if (Array.isArray(row)) {
                    let index = 0;
                    for (const cell of row) {
                        const col = columns[index];
                        deserializedRow[col] = this.deserializeCell(cell, features[col]);
                        index++;
                    }
                    deserialized.push(deserializedRow);
                }
                else {
                    deserialized.push({});
                }
            }
            return deserialized;
        });
    }
}
