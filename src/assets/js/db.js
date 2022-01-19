class Db {

    constructor(_url) {
        this.url = _url
        this.data = []
    }

    loadData() {
        return fetch(this.url)
            .then(r => r.json())
            .then(json => {
                this.data = json
                return this.data
            })
            .catch((e) => {
                return e
            });
    }

}

export { Db }