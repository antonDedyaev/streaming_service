export const declineWord = (number: number, arrayOfOptions: string[]) => {
    let dozens = number % 100;
    let units = number % 10;
    if (dozens > 10 && dozens < 20) return arrayOfOptions[2];
    if (units > 1 && units < 5) return arrayOfOptions[1];
    if (units == 1) return arrayOfOptions[0];
    return arrayOfOptions[2];
};

export const minutesToHours = (minutes: number) => {
    let m = minutes % 60;
    let h = (minutes - m) / 60;
    if (h <= 0) return `${(m < 10 ? '0' : '') + m.toString()} мин.`;
    if (m <= 0) return `${h.toString()} ч.`;
    return `${h.toString()} ч. ${(m < 10 ? '0' : '') + m.toString()} мин.`;
};
