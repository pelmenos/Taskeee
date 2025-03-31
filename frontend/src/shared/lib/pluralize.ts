const getPluralIndex = (count: number): 0 | 1 | 2 => {
  if (count >= 11 && count <= 19) {
    return 2
  }

  const lastNumber = count % 10

  if (lastNumber === 1) {
    return 0
  }

  if (lastNumber >= 2 && lastNumber <= 4) {
    return 1
  }

  return 2
}

export const pluralize = (
  number_: number,
  plurals: [string, string] | [string, string, string],
) => {
  if (plurals.length === 2) {
    const result = number_ % 10 === 1 ? plurals[0] : plurals[1]

    return result
  }

  const count = Math.abs(number_) % 100

  const result = plurals[getPluralIndex(count)]

  return result
}
