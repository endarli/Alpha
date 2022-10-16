// import logo from './logo.svg';
import './App.css';
import { Component} from "react";
const request = require("request");
const util = require("util");
// https://docs.npmjs.com/cli/v8/commands/npm-link for folders outside

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      women: [],
      search: {}
    };

    //Binding event listeners
    this.searchWoman = this.searchWoman.bind(this);
    this.allWomen = this.allWomen.bind(this);
  }

  async componentDidMount(){
    try {
      this.searchWoman();
      this.allWomen();

    } catch(e) {
      console.log("compM");
      console.log(e);
    }
  }

  //Search Woman Handler
  async searchWoman(event) {
    try {
      let requestPromise = util.promisify(request);
      let response = await requestPromise({
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        uri: "http://localhost:4000/woman/E"
      });
      if (response) {
        let data = JSON.parse(response.body);
        this.setState({
          search: {
            wID: data[0].woman_id,
            fLetter: data[0].fLetter,
            wName: data[0].wName,
            wParrafo: data[0].wParrafo,
            wBday: data[0].wBday,
          }
        });
      }
    } catch(e) {
      console.log("search");
      console.log(e);
    }
  }

  // All Woman Handler
  async allWomen() {
    try {
      // GET request
      let requestPromise = util.promisify(request);
      let response = await requestPromise({
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        uri: "http://localhost:4000/women/"
      });
      if (response) {
        let data = JSON.parse(response.body);
        this.setState({
          women: data
        });
      }
    } catch(e) {
      console.log("all");
      console.log(e);
    }
  }

  render() {
    return (
       <div>
        <p>Hello</p>
            {
                this.state.data.map((search)=>
                <div>
                    <span>{search.wName} </span>
                    <span>{search.wParrafo}</span>
                </div>
                )
            }
        </div>
    );
  }
}

export default App;