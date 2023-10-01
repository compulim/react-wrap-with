export default function pick<T extends object, K extends keyof T>(object: T, pickedKeys: K[]): Pick<T, K> {
  return Object.entries(object).reduce(
    (picked, [key, value]) => {
      if (key !== '__proto__' && key !== 'constructor' && key !== 'prototype') {
        if (pickedKeys.includes(key as K)) {
          picked[key as K] = value;
        }
      }

      return picked;
    },
    {} as Partial<Pick<T, K>>
  ) as Pick<T, K>;
}
