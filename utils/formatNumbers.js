function formatNumber(num) {
    if (num < 1000) {
        return num.toString();
    }
    const units = ['k', 'M', 'B', 'T']; 
    const base = 1000;

    const index = Math.floor(Math.log10(num) / 3);
    
    const divisor = Math.pow(base, index);
    

    const formattedNumber = (num / divisor).toFixed(2);
    

    let displayNumber = formattedNumber.endsWith('.00') 
        ? Math.floor(num / divisor).toString() 
        : formattedNumber;
    
    if (formattedNumber<100) displayNumber = formattedNumber.slice(0, 4);
    else displayNumber =formattedNumber.slice(0, 3);
    return `${displayNumber}${units[index - 1]}`;
}

export default formatNumber;