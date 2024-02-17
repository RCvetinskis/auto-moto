export function enumToArray(currentEnum: any) {
  const typeValues: string[] = Object.values(currentEnum);

  const mappedValues: string[] = typeValues.map((value) => {
    return value;
  });
  return mappedValues;
}
