// from https://phrase.com/blog/posts/how-convert-a-decimal-to-a-string-with-thousands-separators/
function formatWithThousandsSeparator(num, separator = ' ') {
    let numAsString = num.toString();

    let characters = numAsString.split('').reverse();

    let parts: any[] = [];

    for (let i = 0; i < characters.length; i += 3) {
        let part = characters
            .slice(i, i + 3)
            .reverse()
            .join('');

        parts.unshift(part);
    }

    return parts.join(separator);
}

export function formatNumber(x: number, unit?: string) {
    let xillionsText: string = undefined;
    if (x > 1_000_000_000) {
        xillionsText = 'billion';
        x /= 1_000_000_000;
    } else if (x > 1_000_000) {
        xillionsText = 'million';
        x /= 1_000_000;
    }

    const rounded = Math.round(x);

    return `${formatWithThousandsSeparator(rounded)}${xillionsText ? ` ${xillionsText}` : ''} ${
        unit ?? ''
    }`;
}
