export default function pickAndOmit<P extends object, O extends object>(
  object: P & O,
  pickedKeys: (keyof P)[]
): [P, O] {
  return Object.entries(object).reduce(
    (state, [key, value]) => {
      if (key !== '__proto__' && key !== 'constructor' && key !== 'prototype') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state[pickedKeys.includes(key as keyof P) ? 0 : 1] as any)[key] = value;
      }

      return state;
    },
    [{}, {}]
  ) as [P, O];
}
