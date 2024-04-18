export const checkProperty = (property: any) => {
  if (property instanceof File) {
    if (property.size !== 0) return true;
  }

  if (typeof property === "string") {
    if (property !== "") return true;
  }

  if (typeof property === "boolean") {
    return true;
  }

  if (typeof property === "number") {
    return true;
  }

  return false;
};

export const valueFormatData = (value: any) => {
  if (value instanceof File) {
    return value as Blob;
  }

  return String(value);
};

export const formatOrdinals = (n: number): string => {
  const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
  const suffixes: Map<string, string> = new Map([
    ["one", "st"],
    ["two", "nd"],
    ["few", "rd"],
    ["other", "th"],
  ]);
  const rule: string = pr.select(n);
  const suffix: string | undefined = suffixes.get(rule);
  if (suffix !== undefined) {
    return `${n}${suffix}`;
  }
  return `${n}th`;
};
