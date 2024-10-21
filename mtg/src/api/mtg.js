class Mtg {

    constructor(baseUrl = "https://api.magicthegathering.io/v1/") {
        this.baseUrl = baseUrl;
    }

    loadCards(page = 1, pageSize = 100, name = ""){
        return fetch(`${this.baseUrl}cards?${new URLSearchParams({page:page, name:name, pageSize:pageSize}).toString()}`)
            .then(response=>response.json())
            .then(json=>json.cards)
    }
}


export {Mtg}
