export function generateWheelSizes() {
  const maxSize = 42;
  const minSize = 4;

  const array = [];
  for (let index = minSize; index <= maxSize; index++) {
    array.push(`R${index}`);
  }

  return array;
}
