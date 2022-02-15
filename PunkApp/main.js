/**
 * @author Dawson Dauphianis
 * dawsondauphinais43@gmail.com
 * 
 * @description The backend for the web application. This handles different API calls for the web app.
 * 
 * date last modified: 02/15/2022
 */
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
    /**
     * @author Dawson Dauphinais 
     * @description Handles the search functionality of the web application.
     */
    search() {
      let val = document.getElementById("query").value;
      this.query = val;
      axios
        .get("https://api.punkapi.com/v2/beers?beer_name=" + this.query)
        .then((r) => {
          console.log("here");
          console.log(r.data);
          this.beerList = r.data;
          if (r.data.length > 0) {
            this.foundBeer = true;
            this.viewDetails(this.beerList);
          }
        })
        .catch((error) => {
          console.log(error);
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
      this.defaultView();
    },
    viewDetails(beer) {
      // this.clearDiv("grid");
      console.log(toString(beer[0].ingredients));
      var div = document.getElementById("beerDet");
      let h = document.createElement("h5");
      let ing = beer.ingredients;
      let content = document.createTextNode(ing);
      h.appendChild(content);
      div.appendChild(h);
    },
    clearDiv(elem) {
      var div = document.getElementById(elem);
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
    },
  },
  beforeMount() {
    this.defaultView();
  },
};

let app = Vue.createApp(vm).mount("#app");
