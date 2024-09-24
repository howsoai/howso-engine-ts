import { FeatureAttributesIndex } from "../../types";
import { ArrayData } from "../base";
import { getFeatureAttributesInferrer } from "../infer";
import { expectFeatureAttributesIndex } from "../infer.test";
import { InferFeatureAttributesFromArray } from "./Array";

describe("features/sources/Array", () => {
  const now = new Date();
  const columns = ["id", "number", "date", "boolean"];
  const data: ArrayData = {
    columns,
    data: [
      ["0", 1.2, now.toISOString(), false],
      ["1", 2.4, now.toISOString(), true],
      ["3", 2.4, null, true],
    ],
  };

  describe("getFeatureAttributesInferrer", () => {
    it("should return an instance of InferFeatureAttributesFromArray for array data", () => {
      const service = getFeatureAttributesInferrer(data, "array");
      expect(service).toBeInstanceOf(InferFeatureAttributesFromArray);
    });
  });

  describe("InferFeatureAttributesFromArray", () => {
    it("isAcceptedSourceFormat should accept ArrayData only", () => {
      expect(InferFeatureAttributesFromArray.isAcceptedSourceFormat(data)).toBe(true);
      // @ts-expect-error Invalid data type on purpose
      expect(InferFeatureAttributesFromArray.isAcceptedSourceFormat([{}, {}])).toBe(false);
    });

    describe("infer", () => {
      it("should infer feature attributes from data", async () => {
        const service = new InferFeatureAttributesFromArray(data);
        const features = await service.infer();
        expectFeatureAttributesIndex(features);

        // Id
        expect(features["id"].type).toBe("continuous");
        expect(features["id"].data_type).toBe("string");
        // Number
        expect(features["number"].type).toBe("continuous");
        expect(features["number"].data_type).toBe("number");
        // Date
        expect(features["date"].type).toBe("continuous");
        expect(features["date"].data_type).toBe("formatted_date_time");
        // Boolean
        expect(features["boolean"].type).toBe("nominal");
        expect(features["boolean"].data_type).toBe("boolean");
      });

      it("should infer feature attributes from data using options", async () => {
        const service = new InferFeatureAttributesFromArray(data);
        const defaults: FeatureAttributesIndex = {
          id: { type: "nominal", data_type: "number" },
          number: { type: "continuous", data_type: "number" },
          date: { type: "continuous", data_type: "formatted_date_time", date_time_format: "%Y-%m-%dT%h-%m-%s" },
        };
        const features = await service.infer({ defaults, includeSample: true });
        expectFeatureAttributesIndex(features);

        // Id
        expect(features["id"].type).toBe(defaults.id.type);
        expect(features["id"].data_type).toBe(defaults.id.data_type);
        expect(features["id"].sample).toBeDefined();
        // Number
        expect(features["number"].type).toBe(defaults.number.type);
        expect(features["number"].data_type).toBe(defaults.number.data_type);
        expect(features["number"].sample).toBeDefined();
        // Date
        expect(features["date"].type).toBe(defaults.date.type);
        expect(features["date"].data_type).toBe(defaults.date.data_type);
        expect(features["date"].date_time_format).toBe(defaults.date.date_time_format);
        expect(features["date"].sample).toBeDefined();
        // Boolean
        expect(features["boolean"].type).toBe("nominal");
        expect(features["boolean"].data_type).toBe("boolean");
        expect(features["boolean"].sample).toBeDefined();
      });
    });
  });
});
