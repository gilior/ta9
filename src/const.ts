export type Item = {
    id: string,
    color: string;
    name: string;
    create: Date;
    update: Date;
    by: string,
    description: string
}

export function generateRandomString(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const length = 24;
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}