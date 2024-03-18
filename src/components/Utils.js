export const checkFullHouse = (diceValues) => {
  const valueSet = new Set(diceValues);
  if (valueSet.size !== 2) {
      return false; // Full house requires two unique values
  }
  for (const value of valueSet) {
      const count = diceValues.filter(v => v === value).length;
      if (count !== 2 && count !== 3) {
          return false; // Full house requires one value with count 2 and another with count 3
      }
  }
  return true;
};

export const checkSmallStraight = (diceValues) => {
  const sortedValues = Array.from(new Set(diceValues)).sort((a, b) => a - b);
  let straightCount = 1;
  for (let i = 0; i < sortedValues.length - 1; i++) {
      if (sortedValues[i + 1] === sortedValues[i] + 1) {
          straightCount++;
      } else {
          straightCount = 1;
      }
      if (straightCount === 4) {
          return true;
      }
  }
  return false;
};

export const checkFullStraight = (diceValues) => {
  const valueSet = new Set(diceValues);
  return valueSet.size === 5 && Math.max(...valueSet) - Math.min(...valueSet) === 4;
};
