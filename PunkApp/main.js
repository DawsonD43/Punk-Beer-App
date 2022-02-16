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
      query: "",
      canView: false,
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
            this.canView = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    defaultView() {
      axios.get("https://api.punkapi.com/v2/beers").then((r) => {
        this.beerList = r.data;
        this.query = "";
        this.canView = false;
        this.clearSearch();
      });
    },
    clearSearch() {
      this.query = "";
      const inputField = document.getElementById("query");
      inputField.value = "";
    },
    viewDetails(beer) {
      console.log(beer);
      axios
        .get("https://api.punkapi.com/v2/beers?beer_name=" + beer.name)
        .then((r) => {
          this.beerList = r.data;
          this.canView = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeMount() {
    this.defaultView();
  },
};

let app = Vue.createApp(vm).mount("#app");
