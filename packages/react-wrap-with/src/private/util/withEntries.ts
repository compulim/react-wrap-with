export default function filterEntries<T extends object>(obj: T, predicate: (value: unknown, key: keyof T) => boolean) {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => predicate(value, key as keyof T)));
}
