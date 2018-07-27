import d3 from 'd3'
import React, {Component} from 'react'
import ReactFauxDOM from 'react-faux-dom'
import ForceLayout from './forcelayout'

export default class Main extends Component {
   constructor() {
     super();

     this.state = {
       width: 420,
       height: 420,
       data: {
            nodes: [
                    { name: "Adam" },
                    { name: "Bob" },
                    { name: "Carrie" },
                    { name: "Donovan" },
                    { name: "Edward" },
                    { name: "Felicity" },
                    { name: "George" },
                    { name: "Hannah" },
                    { name: "Iris" },
                    { name: "Jerry" }
            ],
            edges: [
                    { source: 0, target: 1 },
                    { source: 0, target: 2 },
                    { source: 0, target: 3 },
                    { source: 0, target: 4 },
                    { source: 1, target: 5 },
                    { source: 2, target: 5 },
                    { source: 2, target: 5 },
                    { source: 3, target: 4 },
                    { source: 5, target: 8 },
                    { source: 5, target: 9 },
                    { source: 6, target: 7 },
                    { source: 7, target: 8 },
                    { source: 8, target: 9 }
            ]
          }
     }

   }

   render() {
      return (
         <ForceLayout data={this.state.data}/>
      )
    }
};