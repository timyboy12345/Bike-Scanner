export function getBikeShedName(id: string) {
    switch (id) {
        case 'UO':
            return 'Utrecht Centraal Stationsplein';
        default:
            return id;
    }
}

export function displayDate(dateTime: string) {
    const date = new Date(dateTime);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

export function displayDateTime(dateTime: string) {
    const date = new Date(dateTime);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} om ${date.getHours()}:${date.getMinutes()}`;
}
