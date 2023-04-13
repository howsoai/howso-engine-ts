var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isArrayData } from "./base.js";
import { DiveplaneError } from "../client/errors.js";
import { FeatureSerializerArrayData } from "./abstract/arrays.js";
function detectFormat(data) {
    if (isArrayData(data)) {
        return "array";
    }
    return "unknown";
}
export function getFeatureSerializer(format) {
    let svc;
    switch (format) {
        case "array":
            svc = new FeatureSerializerArrayData();
            break;
        default:
            throw new DiveplaneError("Unexpected data format.");
    }
    return svc;
}
/**
 * Serialize cases based on feature attribute metadata.
 * @param data The data to serialize.
 * @param features The feature attributes of the data.
 * @returns The serialized cases.
 */
export function serializeCases(data, features) {
    return __awaiter(this, void 0, void 0, function* () {
        const svc = getFeatureSerializer(detectFormat(data));
        return yield svc.serialize(data, features);
    });
}
/**
 * Deserialize cases based on feature attribute metadata.
 * @param data The data to deserialize.
 * @param features The feature attributes of the data.
 * @returns The deserialized data.
 */
export function deserializeCases(format, data, columns, features) {
    return __awaiter(this, void 0, void 0, function* () {
        const svc = getFeatureSerializer(format);
        const result = yield svc.deserialize(data, columns, features);
        return result;
    });
}
