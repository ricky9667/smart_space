export const useRandom = (min: number, max: number): number => {
  const byteArray = new Uint32Array(1)
  crypto.getRandomValues(byteArray)

  const range = max - min + 1
  const maxRange = 4294967296
  if (byteArray[0] >= Math.floor(maxRange / range) * range)
    return useRandom(min, max)

  return min + (byteArray[0] % range)
}
