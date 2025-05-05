export const clearValue = (
  value: string | string[] | number | boolean | null | undefined
): string | string[] | null => {
  if (typeof value === 'number' || typeof value === 'boolean') {
    return value.toString();
  }

  return value ?? null;
}