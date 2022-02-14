import "./style.css";
import axios from "axios";

let vm = {
  data() {
    return {
      message: "Hey, Punk!",
      beerList: [],
      foundBeer: false,
      query: "",
    };
  },
  methods: {
    search() {
      var tmp = document.getElementById("searchbar").value;
      axios
        .get("https://api.punkapi.com/v2/beers?beer_name=" + tmp)
        .then((r) => {
          this.beerList = r.data;
          alert("Here");
          if (r.data.length > 0) {
            this.foundBeer = true;
          }
        });
    },
    defaultView() {
      axios.get("https://api.punkapi.com/v2/beers").then((r) => {
        this.beerList = r.data;
        this.foundBeer = true;
        this.query = "";
      });
    },
    clearSearch() {
      axios.get("https://api.punkapi.com/v2/beers");
      this.beerList = [];
      this.query = "";
    },
    // viewDetails(beer) {
    //   this.clearDiv("grid");
    //   let name = beer.name;
    //   let ingredients = beer.ingredients;
    //   let desc = beer.description;
    //   var elemDiv = document.createElement("div");
    //   elemDiv.className = "details";
    //   var h = document.createElement("h1");
    //   h.textContent = name;
    //   console.log(ingredients);
    // },
    // clearDiv(elem) {
    //   var div = document.getElementById(elem);
    //   while (div.firstChild) {
    //     div.removeChild(div.firstChild);
    //   }
    // },
  },
  // beforeMount() {
  //   this.defaultView();
  // },
};

let app = Vue.createApp(vm).mount("#app");
