export const convertCreatedAtDate = (isoDate: Date) => {
    const date = new Date(isoDate);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const humanReadableDate = date.toLocaleDateString('en-US', options);
    return humanReadableDate;
}
