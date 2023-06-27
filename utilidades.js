export const obterIdDaURL = (url) => {
    const split = url.split('/');
    return split[split.length - 2];
}