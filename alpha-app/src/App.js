import './App.css';
import { Component } from "react";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material';
import { AppBar, Toolbar, TextField, Button, Box } from "@material-ui/core";
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
  }

  async componentDidMount(){
    try {
      this.allWomen();

    } catch(e) {
      console.log("compM");
      console.log(e);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      sumbitted: true,
      fLet: document.getElementById('fL').value
    })

    this.searchWoman();
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
        uri: "http://localhost:4000/woman/"+JSON.stringify(fLet)
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

        <form onSubmit={handleSubmit}>
          First Letter of Your Name:
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="please format in Uppercase"
            variant="outlined"
            id="fL"
          />
          <br />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
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