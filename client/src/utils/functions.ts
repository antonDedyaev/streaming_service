export const declensionOfWordFromNumber = (number: number, arrayOfOptions: string[]) => {
  number = Math.abs(number) % 100;
  let num = number % 10;
  if (number > 10 && number < 20) return arrayOfOptions[2];
  if (num > 1 && num < 5) return arrayOfOptions[1];
  if (num == 1) return arrayOfOptions[0];
  return arrayOfOptions[2];
};
