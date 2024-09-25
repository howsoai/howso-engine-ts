import { FeatureAttributes, FeatureAttributesIndex } from "../types";

it.todo("TODO implement generic infer tests");

export const expectFeatureAttributesIndex = (index: FeatureAttributesIndex | undefined) => {
  if (!index) {
    throw new Error("index is undefined");
  }
  Object.entries(index).forEach(([key, attributes]) => {
    expect(typeof key).toBe("string");
    expectFeatureAttributes(attributes);
  });
};

export const expectFeatureAttributes = (attributes: FeatureAttributes | undefined) => {
  if (!attributes) {
    throw new Error("attributes is undefined");
  }

  expect(attributes.type).toBeTruthy();
  expect(attributes.data_type).toBeTruthy();
  expect(typeof attributes.bounds?.allow_null).toBe("boolean");
  // TODO expand on this testing
};
