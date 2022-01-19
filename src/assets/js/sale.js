class Sale {
    constructor(sale) {
        this.id = sale.SaleId
        this.date = sale.SaleDate
        this.weight = sale.SaleWeight
        this.unitPrice = sale.SaleUnitPrice
        this.active = sale.SaleActive
        this.vegetableId = sale.VegetableId
        this.name = sale.Name
        this.variety = sale.Variety
        this.fullname = this.computeFullName()
    }

    computeFullName() {
        return `${this.name} ${this.variety}`
    }
}

export {Sale}