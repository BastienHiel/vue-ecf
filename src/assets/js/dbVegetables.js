import { Db } from './db'
import { Vegetable } from './vegetable'

class DbVegetables extends Db {

    constructor() {
        super('./legumos.json')
    }

    loadData() {
        return super.loadData().then(vegetables => {
            for (let i in vegetables) {
                this.data[i] = new Vegetable(this.data[i])
            }
            return this.data
        })
    }

    filterByVegeSelected(vegetable) {
        return this.data.filter(vege => vege === vegetable)
    }



}

export { DbVegetables }