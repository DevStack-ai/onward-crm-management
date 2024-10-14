export function numberToCurrency(n: number | number[] | string | string[], currency: boolean = false) {




    const isArray = Array.isArray(n);

    const numbers = isArray ? n : [n];

    const cleanNumbers = numbers.map((num) => num.toString().replace(/[^0-9.]/g, ''));
    const parsedNumbers = cleanNumbers.map((num) => parseFloat(num));
    const sum = parsedNumbers.reduce((acc, num) => acc + num, 0);


    if (currency) {
        return sum;
    }

    if (isNaN(sum)) {
        return "Numero invalido";
    }

    const numberString = sum.toFixed(2);

    const parts = numberString.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];
    const integerPartWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `$ ${integerPartWithCommas}.${decimalPart}`;




}
export function currencyToNumber(n: number | number[] | string | string[], currency: boolean = false): number | string {


    const isArray = Array.isArray(n);

    const numbers = isArray ? n : [n];

    const cleanNumbers = numbers.map((num) => num.toString().replace(/[^0-9.]/g, ''));
    const parsedNumbers = cleanNumbers.map((num) => parseFloat(num));
    const sum = parsedNumbers.reduce((acc, num) => acc + num, 0);

    if (currency) {
        return sum;
    }

    if (isNaN(sum)) {
        return "Numero invalido";
    }

    const numberString = sum.toFixed(2);
    return Number(numberString)


}
export function fcurrencyToNumber(n: number | number[] | string | string[], currency: boolean = false): number  {


    const isArray = Array.isArray(n);

    const numbers = isArray ? n : [n];

    const cleanNumbers = numbers.map((num) => num.toString().replace(/[^0-9.]/g, ''));
    const parsedNumbers = cleanNumbers.map((num) => parseFloat(num));
    const sum = parsedNumbers.reduce((acc, num) => acc + num, 0);

    if (currency) {
        return sum;
    }

    if (isNaN(sum)) {
        return 0;
    }

    const numberString = sum.toFixed(2);
    return Number(numberString)


}

export function getBadgeColor(status: string) {
    switch (status.toLocaleLowerCase()) {
        case 'activo':
            return 'success';
        default:
            return 'danger';
    }
}