/**
 * @author Dawson Dauphianis
 * dawsondauphinais43@gmail.com
 *
 * @description The backend for the web application. This handles different API calls for the web app.
 *
 * date last modified: 02/16/2022
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
     * 
     * Date last modified: 02/16/2022
     */
    search() {
      let val = document.getElementById("query").value;
      this.query = val;
      axios
        .get("https://api.punkapi.com/v2/beers?beer_name=" + this.query)
        .then((r) => {
          this.beerList = r.data;
          if (r.data.length > 0) {
            this.canView = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /**
     * @author Dawson Dauphinais
     * @description calls the api with the "random" parameter, which allows the user to view a random beer.
     * 
     * Date last modified: 02/16/2022
     */
    viewRandom() {
      axios
        .get("https://api.punkapi.com/v2/beers/random")
        .then((r) => {
          this.beerList = r.data;
          if (r.data.length > 0) {
            this.canView = true;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /**
     * @author Dawson Dauphinais
     * @description Populates the beer list to render a default view.
     * 
     * Date last modified: 02/16/2022
     */
    defaultView() {
      axios.get("https://api.punkapi.com/v2/beers/").then((r) => {
        this.beerList = r.data;
        this.query = "";
        this.canView = false;
        this.clearSearch();
      });
    },
    /**
     * @author Dawson Dauphinais
     * @description Clears the search bar.
     * 
     * Date last modified: 02/16/2022
     */
    clearSearch() {
      this.query = "";
      const inputField = document.getElementById("query");
      inputField.value = "";
    },
    /**
     * @author Dawson Dauphinais
     * @param beer the current beer object
     * @description Allows the beer description to be viewed by the user.
     * 
     * Date last modified: 02/16/2022
     */
    viewDetails(beer) {
      console.log(beer);
      axios
        .get("https://api.punkapi.com/v2/beers/" + beer.id)
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
