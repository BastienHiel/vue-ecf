import { Db } from './db'
import { Sale } from './sale'

class DbSales extends Db {

    constructor() {
        super('./legumos-sales.json')
    }

    loadData() {
        return super.loadData().then(sales => {
            for (let i in sales) {
                this.data[i] = new Sale(this.data[i])
            }
            return this.data
        })
    }

}

export { DbSales }