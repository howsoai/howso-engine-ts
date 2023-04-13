var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FeatureAttributesTypeEnum } from "diveplane-openapi-client/models";
export function isArrayData(data) {
    return (data === null || data === void 0 ? void 0 : data.columns) != null && (data === null || data === void 0 ? void 0 : data.data) != null;
}
export class InferFeatureAttributesBase {
    /* Entrypoint */
    infer(options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const attributes = options.defaults || {};
            const { ordinalFeatureValues = {}, dependentFeatures = {} } = options;
            const columns = yield this.getFeatureNames();
            // Determine base feature attributes
            for (let i = 0; i < columns.length; i++) {
                const feature = columns[i];
                if (feature in attributes && ((_a = attributes[feature]) === null || _a === void 0 ? void 0 : _a.type)) {
                    // Attributes exist for feature, skip
                    continue;
                }
                const featureType = yield this.getFeatureType(feature);
                // Explicitly declared ordinals
                if (feature in ordinalFeatureValues) {
                    attributes[feature] = {
                        type: FeatureAttributesTypeEnum.Ordinal,
                        bounds: { allowed: ordinalFeatureValues[feature] },
                    };
                }
                else if (featureType != null) {
                    switch (featureType.data_type) {
                        case "numeric":
                            attributes[feature] = yield this.inferFloat(feature);
                            break;
                        case "integer":
                            attributes[feature] = yield this.inferInteger(feature);
                            break;
                        case "string":
                            attributes[feature] = yield this.inferString(feature);
                            break;
                        case "boolean":
                            attributes[feature] = yield this.inferBoolean(feature);
                            break;
                        case "datetime":
                            attributes[feature] = yield this.inferDatetime(feature);
                            break;
                        case "date":
                            attributes[feature] = yield this.inferDate(feature);
                            break;
                        case "time":
                            attributes[feature] = yield this.inferTime(feature);
                            break;
                        case "timedelta":
                            attributes[feature] = yield this.inferTimedelta(feature);
                            break;
                        default:
                            attributes[feature] = yield this.inferString(feature);
                            break;
                    }
                }
                else {
                    attributes[feature] = yield this.inferUnknown(feature);
                }
                // Add original type
                if (featureType != null) {
                    attributes[feature].original_type = featureType;
                }
            }
            // Determine feature properties
            for (let i = 0; i < columns.length; i++) {
                const feature = columns[i];
                // Set unique flag
                if (attributes[feature].unique == null && (yield this.inferUnique(feature))) {
                    attributes[feature].unique = true;
                }
                // Add dependent features
                if (attributes[feature].dependent_features == null && feature in dependentFeatures) {
                    attributes[feature].dependent_features = dependentFeatures[feature];
                }
                // Set dropna flag
                if (options.dropna && attributes[feature].dropna == null) {
                    if (Array.isArray(options.dropna)) {
                        if (options.dropna.indexOf(feature) != -1) {
                            attributes[feature].dropna = true;
                        }
                    }
                    else {
                        attributes[feature].dropna = true;
                    }
                }
                // Infer bounds
                const { inferBounds = true } = options;
                if (inferBounds && attributes[feature].bounds == null) {
                    const bounds = yield this.inferBounds(attributes[feature], feature, typeof inferBounds === "boolean" ? {} : inferBounds);
                    if (bounds != null) {
                        attributes[feature].bounds = bounds;
                    }
                }
                // Infer time series attributes
                if (options.timeSeries && attributes[feature].time_series == null) {
                    // TODO - infer time series
                }
            }
            return attributes;
        });
    }
    inferUnknown(_featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            return { type: FeatureAttributesTypeEnum.Nominal };
        });
    }
}
export class FeatureSerializerBase {
}
