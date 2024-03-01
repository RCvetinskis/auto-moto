export function enumToArray(currentEnum: any) {
  const typeValues: string[] = Object.values(currentEnum);

  const mappedValues: string[] = typeValues.map((value) => {
    return value;
  });
  return mappedValues;
}
export function enumToArrayObject(currentEnum: any) {
  const enumEntries = Object.entries(currentEnum);

  return enumEntries.map(([key, value]) => ({ key, value }));
}
