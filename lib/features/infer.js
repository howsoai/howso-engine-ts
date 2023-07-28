var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isArrayData, isParsedArrayData } from "./base.js";
import { DiveplaneError } from "../client/errors.js";
import { InferFeatureAttributesFromArray } from "./abstract/arrays.js";
import { InferFeatureAttributesFromParsedArray } from "./abstract/parsed.js";
export function getFeatureAttributesInferrer(data) {
    let svc;
    if (isArrayData(data)) {
        svc = new InferFeatureAttributesFromArray(data);
    }
    else if (isParsedArrayData(data)) {
        svc = new InferFeatureAttributesFromParsedArray(data);
    }
    else {
        throw new DiveplaneError("Unexpected data format.");
    }
    return svc;
}
export function inferFeatureAttributes(data, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const svc = getFeatureAttributesInferrer(data);
        return yield svc.infer(options);
    });
}
