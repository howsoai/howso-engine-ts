export function toPascalCase(value: string) {
  return value
    .replace(/_+/g, " ")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, "");
}

export function toCamelCase(value: string) {
  return value
    .replace(/_+/g, " ")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
