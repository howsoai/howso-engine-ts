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
  expectFeatureAttributeBounds(attributes);
  // TODO expand on this testing
};

const expectFeatureAttributeBounds = (attributes: FeatureAttributes) => {
  if (!attributes.bounds) {
    return;
  }

  expect(typeof attributes.bounds.allow_null).toBe("boolean");
  if (attributes.bounds.min && attributes.bounds.max) {
    if (typeof attributes.bounds.min === "number") {
      expect(attributes.bounds.min).toBeLessThan(attributes.bounds.max as number);
    }
    if (attributes.data_type === "formatted_date_time") {
      expect(new Date(attributes.bounds.min).getTime()).toBeLessThan(new Date(attributes.bounds.max).getTime());
    }
  }
};
