// @ts-check

export default class SWApiClient {
    constructor() {
        this.base = "https://swapi.dev/api/";
    }

    async get(endpoint) {
        const resposta = await fetch(`${this.base}/${endpoint}`);
        return resposta.json();
    }

    async obterNaves(pagina) {
        const params = new URLSearchParams({
            page: pagina
        });
        return await this.get(`starships/?${params}`);
    }
}