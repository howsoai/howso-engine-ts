import { readFileSync } from "fs";
import { join } from "path";
import { FeatureAttributesIndex } from "../../types";
import { getFeatureAttributesInferrer } from "../infer";
import { expectFeatureAttributesIndex } from "../infer.test";
import { InferFeatureAttributesFromCSV, InferFeatureAttributesFromCSVOptions } from "./CSV";

const data = readFileSync(join(__dirname, "asteroids-sample.csv")).toString();

describe("features/sources/CSV", () => {
  describe("getFeatureAttributesInferrer", () => {
    it("should return an instance of InferFeatureAttributesFromArray for array data", () => {
      const service = getFeatureAttributesInferrer(data, "csv");
      expect(service).toBeInstanceOf(InferFeatureAttributesFromCSV);
    });
  });

  describe("InferFeatureAttributesFromArray", () => {
    it("isAcceptedSourceFormat should accept csv only", () => {
      expect(InferFeatureAttributesFromCSV.isAcceptedSourceFormat(data)).toBe(true);
      // @ts-expect-error Invalid data type on purpose
      expect(InferFeatureAttributesFromCSV.isAcceptedSourceFormat([{}, {}])).toBe(false);
    });

    describe("infer", () => {
      it.skip("should infer feature attributes from data", async () => {
        const service = new InferFeatureAttributesFromCSV(data);
        const features = await service.infer();
        expectFeatureAttributesIndex(features);

        // IR: {
        //   bounds: { allow_null: true },
        //   original_type: undefined,
        //   type: 'nominal'
        // },
        // a: {
        //   bounds: { min: 1, max: 7.38905609893065, allow_null: false },
        //   original_type: { data_type: 'numeric', size: 8 },
        //   type: 'continuous',
        //   data_type: 'number',
        //   decimal_places: 9
        // },
        // e: {
        //   bounds: {
        //     min: 0.049787068367863944,
        //     max: 0.36787944117144233,
        //     allow_null: false
        //   },
        //   original_type: { data_type: 'numeric', size: 8 },
        //   type: 'continuous',
        //   data_type: 'number',
        //   decimal_places: 9
        // },
      });

      it("should infer feature attributes from data using options", async () => {
        const serviceOptions: InferFeatureAttributesFromCSVOptions = {
          limit: 5,
          samplesLimit: 2,
        };
        const service = new InferFeatureAttributesFromCSV(data, serviceOptions);
        expect(service.samples?.length).toBe(serviceOptions.samplesLimit);

        const defaults: FeatureAttributesIndex = {
          // id: { type: "nominal", data_type: "number" },
          // number: { type: "continuous", data_type: "number" },
          // date: { type: "continuous", data_type: "formatted_date_time", date_time_format: "%Y-%m-%dT%h-%m-%s" },
        };
        const features = await service.infer({ defaults, includeSample: true });
        console.info(features);
        expectFeatureAttributesIndex(features);

        // // Id
        // expect(features["id"].type).toBe(defaults.id.type);
        // expect(features["id"].data_type).toBe(defaults.id.data_type);
        // expect(features["id"].original_type?.data_type).toBe("string");
        // expect(features["id"].sample).toBeDefined();
        // // Number
        // expect(features["number"].type).toBe(defaults.number.type);
        // expect(features["number"].data_type).toBe(defaults.number.data_type);
        // expect(features["number"].original_type?.data_type).toBe("numeric");
        // expect(features["number"].sample).toBeDefined();
        // // Date
        // expect(features["date"].type).toBe(defaults.date.type);
        // expect(features["date"].data_type).toBe(defaults.date.data_type);
        // expect(features["date"].original_type?.data_type).toBe("datetime");
        // expect(features["date"].date_time_format).toBe(defaults.date.date_time_format);
        // expect(features["date"].sample).toBeDefined();
        // // Boolean
        // expect(features["boolean"].type).toBe("nominal");
        // expect(features["boolean"].data_type).toBe("boolean");
        // expect(features["boolean"].sample).toBeDefined();
        // expect(features["boolean"].original_type?.data_type).toBe("boolean");
      });
    });
  });
});
