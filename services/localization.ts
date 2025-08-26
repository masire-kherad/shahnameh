const farsiDigits: { [key: string]: string } = {
  '0': '۰',
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹',
};

export const toFarsiNumber = (n: number | string): string => {
  const s = String(n);
  return s.replace(/[0-9]/g, (w) => farsiDigits[w]);
};
