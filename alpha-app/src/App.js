import './App.css';
import { Component } from "react";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material';
const request = require("request");
const util = require("util");
// https://docs.npmjs.com/cli/v8/commands/npm-link for folders outside

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sumbitted: false,
      fLet: null,
      women: [],
      search: {}
    };

    //Binding event listeners
    this.searchWoman = this.searchWoman.bind(this);
    this.allWomen = this.allWomen.bind(this);
    this.handleSubmit = this.handleSubmit(this);
    this.bSearchWoman = this.bSearchWoman(this);
  }

  async componentDidMount(){
    try {
      this.allWomen();
      this.bSearchWoman();

    } catch(e) {
      console.log(e);
    }
  }

  handleSubmit(event) {
    try {this.setState({
        sumbitted: true,
        fLet: document.getElementById('fL').value
      })
      window.localStorage.setItem(1, this.state.fLet);
      this.searchWoman();
    } catch(e) {
      return e;
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

  //Search Woman Handler
  async searchWoman(event) {
    try {
      let requestPromise = util.promisify(request);
      let response = await requestPromise({
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        uri: "http://localhost:4000/woman/"+localStorage.getItem(1)
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

  // back up
  async bSearchWoman(event) {
    try {
      let requestPromise = util.promisify(request);
      let response = await requestPromise({
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
        uri: "http://localhost:4000/woman/A"
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

  render() {
    var search = this.state.search;
    return (
       <div className="App">
        <h className="App-header">
          <p>Alpha</p>
        </h>

        <form>
          <p>First Letter of Your Name:</p>
          <input
            style={{ height: "30px", width: "200px", margin: "5px" , textAlign: "center", border: "0px"}}
            type="text"
            placeholder="Please Format in Uppercase"
            id="fL"
          />
          <br />
          <br />
          <button type="submit" color="primary" onSubmit={()=>this.handleSubmit()}>
            Submit
          </button>
        </form>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">First Letter of Name</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">About</TableCell>
                <TableCell align="left">Birthday</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.keys(search).map(function(value, idx) {
                return <TableCell key={idx}>
                  {search[value]}
                </TableCell>
              })}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
    );
  }
}

export default App;