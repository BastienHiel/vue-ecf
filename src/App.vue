<template>
  <div class="wrapper">
    <header>
      <img class="header-img" src="./assets/img/legumos.jpg" alt="">
      <nav class="nav">
        <ul class="nav-list">
          <div class="nav-left">
            <li @click="navClick('home')" class="nav-list-item">Ventes</li>
            <li class="nav-list-item">Nouvelle vente</li>
          </div>
          <div class="nav-right">
            <li @click="navClick('vege')" class="nav-list-item">Légumes</li>
            <li class="nav-list-item">Nouveau légume</li>
          </div>
        </ul>
      </nav>
    </header>
    <main>
      <article class="sales-article" v-if="page === 'home'">
        <h1 class="article-title">Liste des ventes</h1>
        <section class="vegetable-section" v-for="sale in sales" :key="sale.id">
          <h2 class="vegetable-name">{{sale.fullname}} <span class="vegetable-weight">({{sale.weight}} KGS)</span></h2>
          <p class="vegetable-date"><time :datetime="sale.date">{{sale.date}}</time></p>
        </section>
      </article>
      <article class="sales-article" v-else-if="page === 'vege'">
        <h1 class="article-title">Liste des légumes</h1>
        <table>
          <thead>
            <tr>
              <th class="column-name">Nom</th>
              <th class="column-name">Variété</th>
              <th class="column-name">Couleur</th>
              <th class="column-name">Durée Conservation</th>
              <th class="column-name">Frais</th>
              <th class="column-name">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vegetable in vegetables" :key="vegetable.id">
              <td 
                @click="vegetableNameClick(vegetable)"
                class="table-data-capitalized">
                {{vegetable.name}}
              </td>
              <td class="table-data-capitalized">{{vegetable.variety}}</td>
              <td>{{vegetable.primaryColor}}</td>
              <td>{{vegetable.lifeTime}}</td>
              <td>{{vegetable.fresh === 0 ? 'non' : 'non'}}</td>
              <td><a class="table-edit-delete" href="#">Editer</a> · <a class="table-edit-delete" href="#">Supprimer</a></td>
            </tr>
          </tbody>
        </table>
          <div v-if="vegeSelected !== null" class="current-vege-sales">
            <section class="vegetable-section" v-for="sale in currentVegeSales" :key="sale.id">
              <h2 class="vegetable-name">{{sale.fullname}} <span class="vegetable-weight">({{sale.weight}} KGS)</span></h2>
              <p class="vegetable-date"><time :datetime="sale.date">{{sale.date}}</time></p>
            </section>
          </div>
      </article>
    </main>
  </div>
</template>

<script>
  import { DbSales } from "./assets/js/dbSales";
  import { DbVegetables } from "./assets/js/dbVegetables"
  export default {
    name: 'App', 

    data() {
      return {
        dbSales: new DbSales(), 
        dbVegetables: new DbVegetables(),
        sales: [], 
        vegetables: [], 
        page: 'home', 
        vegeSelected: null
      }
    },

    mounted() {
      this.dbSales.loadData().then(data => this.sales = data)
      this.dbVegetables.loadData().then(data => this.vegetables = data)
    }, 

    computed: {
      currentVegeSales() {
        return this.sales.filter(sale => sale.vegetableId === this.vegeSelected.id)
      }
    },

    methods: {
        navClick(page) {
          if (page === 'home') {
            this.page = 'home'
          } else {
            this.page = 'vege'
          }
        },

        vegetableNameClick(vegetable) {
          if (this.vegeSelected === vegetable) {
            this.vegeSelected = null
            this.vegetables = this.dbVegetables.data
          } else {
            this.vegeSelected = vegetable
            this.vegetables = this.dbVegetables.filterByVegeSelected(vegetable)
          }
          
        }
    }
  }
</script>

<style>
  *{
    margin: 0; 
    font-family: Verdana, sans-serif;
  }
  :root{
  --primary-color: rgb(13, 138, 90); 
  --secondary-color: rgb(0, 0, 0); 
  --tertiary-color: rgb(255, 255, 255); 
  }
  .wrapper{
    width: 1200px;
    margin: auto;
    border: 5px solid var(--secondary-color); 
  }
  header{
    display: flex;
    flex-wrap: wrap;
  }
  .header-img{
    width: 100%;
  }
  .nav{
    background-color: var(--primary-color);
    width: 100%;
    padding: .5rem;
  }
  .nav-list{
    list-style-type: none;
    display: flex;
    justify-content: space-around;
  }
  .nav-left{
    display: flex;
    justify-content: center;
    gap: 5rem;
    width: 50%;
  }
  .nav-right{
    display: flex;
    justify-content: center;
    gap: 5rem; 
    width: 50%;
  }
  .nav-list-item{
    text-transform: uppercase;
    color: var(--tertiary-color); 
    font-weight: 400;
  }
  .sales-article{
    display: flex; 
    flex-wrap: wrap; 
    justify-content: center;
    gap: .5rem; 
    row-gap: .5rem;
  }
  .article-title{
    width: 100%;
    padding: .5rem;
  }
  .vegetable-section{
    padding: .3rem;
    background-color: var(--primary-color);
    color: var(--tertiary-color); 
    width: 16rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;    
  }
  .vegetable-name{
    font-size: medium;
    text-align: center;
    text-transform: uppercase;
  }
  .vegetable-date{
    font-size: smaller;
  }
  .vegetable-section:hover {
    background-color: var(--secondary-color);
  }
  .column-name{
    background-color: var(--primary-color);
    color: yellow;
  }
  .table-data-capitalized{
    text-transform: capitalize;
  }
  .table-edit-delete{
     text-decoration: none; 
     color: var(--secondary-color)
  }
  .current-vege-sales{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: .5rem;
  }
</style>
