import { readFileSync } from "fs";
import type { FeatureAttributes, FeatureAttributesIndex } from "../../../types";
import type { AbstractDataType } from "../../base";
import { expectFeatureAttributesIndex } from "../../infer.test";
import { InferFeatureAttributesFromCSV, type InferFeatureAttributesFromCSVOptions } from "./CSV";

describe("features/sources/CSV", () => {
  describe("InferFeatureAttributesFromArray", () => {
    it("isAcceptedSourceFormat should accept csv only", () => {
      expect(InferFeatureAttributesFromCSV.isAcceptedSourceFormat("" as unknown as AbstractDataType)).toBe(true);
      // @ts-expect-error Invalid data type on purpose
      expect(InferFeatureAttributesFromCSV.isAcceptedSourceFormat([{}, {}])).toBe(false);
    });

    describe("infer", () => {
      const data = readFileSync("src/tests/assets/asteroids-sample.csv").toString();
      describe("asteroids", () => {
        const columns = [
          "full_name",
          "a",
          "e",
          "G",
          "i",
          "om",
          "w",
          "q",
          "ad",
          "per_y",
          "data_arc",
          "condition_code",
          "n_obs_used",
          "H",
          "diameter",
          "extent",
          "albedo",
          "rot_per",
          "GM",
          "BV",
          "UB",
          "IR",
          "spec_B",
          "spec_T",
          "neo",
          "pha",
          "moid",
        ];

        it("should infer feature attributes from data", async () => {
          const service = new InferFeatureAttributesFromCSV(data);
          const features = await service.infer();
          expectFeatureAttributesIndex(features);
          expectAsteroids(features);
        });

        it("should infer feature attributes from data using options", async () => {
          const serviceOptions: InferFeatureAttributesFromCSVOptions = {
            limit: 5,
            samplesLimit: 2,
          };
          const service = new InferFeatureAttributesFromCSV(data, serviceOptions);
          expect(service.samples?.length).toBe(serviceOptions.samplesLimit);

          const features = await service.infer({ includeSample: true });
          expect(Object.keys(features)).toStrictEqual(columns);
          expectFeatureAttributesIndex(features);
          expectAsteroids(features);
        });

        const expectAsteroids = (features: FeatureAttributesIndex) => {
          expect(Object.keys(features)).toStrictEqual(columns);
          expectIRFeature(features.IR);
        };

        // IR is a special snowflake, there's no data for it. Testing the unknown handling
        const expectIRFeature = (attributes: FeatureAttributes) => {
          expect(attributes.type).toBe("continuous");
          expect(attributes.data_type).toBe("number");
          expect(attributes.bounds?.allow_null).toBe(true);
        };
      });
    });
  });
});
