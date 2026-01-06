export function getFullIndex(index: number) {
  return index < 10 ? `00${index}` : index < 100 ? `0${index}` : index
}