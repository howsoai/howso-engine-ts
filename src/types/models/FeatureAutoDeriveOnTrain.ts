/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  FeatureAutoDeriveOnTrainCustom,
  FeatureAutoDeriveOnTrainCustomFromJSONTyped,
  FeatureAutoDeriveOnTrainCustomToJSON,
} from "./FeatureAutoDeriveOnTrainCustom";
import {
  FeatureAutoDeriveOnTrainProgress,
  FeatureAutoDeriveOnTrainProgressFromJSONTyped,
  FeatureAutoDeriveOnTrainProgressToJSON,
} from "./FeatureAutoDeriveOnTrainProgress";

/**
 * @type FeatureAutoDeriveOnTrain
 * Define how to create and derive all the values for this feature from the trained dataset.
 * @export
 */
export type FeatureAutoDeriveOnTrain =
  | ({ derive_type: "custom" } & FeatureAutoDeriveOnTrainCustom)
  | ({ derive_type: "progress" } & FeatureAutoDeriveOnTrainProgress);

export function FeatureAutoDeriveOnTrainFromJSON(json: any): FeatureAutoDeriveOnTrain {
  return FeatureAutoDeriveOnTrainFromJSONTyped(json, false);
}

export function FeatureAutoDeriveOnTrainFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): FeatureAutoDeriveOnTrain {
  if (json === undefined || json === null) {
    return json;
  }
  switch (json["derive_type"]) {
    case "custom":
      return { ...FeatureAutoDeriveOnTrainCustomFromJSONTyped(json, true), derive_type: "custom" };
    case "progress":
      return { ...FeatureAutoDeriveOnTrainProgressFromJSONTyped(json, true), derive_type: "progress" };
    default:
      throw new Error(`No variant of FeatureAutoDeriveOnTrain exists with 'derive_type=${json["derive_type"]}'`);
  }
}

export function FeatureAutoDeriveOnTrainToJSON(value?: FeatureAutoDeriveOnTrain | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  switch (value["derive_type"]) {
    case "custom":
      return FeatureAutoDeriveOnTrainCustomToJSON(value);
    case "progress":
      return FeatureAutoDeriveOnTrainProgressToJSON(value);
    default:
      throw new Error(`No variant of FeatureAutoDeriveOnTrain exists with 'derive_type=${value["derive_type"]}'`);
  }
}
