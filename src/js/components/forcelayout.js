import d3 from 'd3'
import React, {Component} from 'react'
import ReactFauxDOM from 'react-faux-dom'

class ForceLayout extends Component {
   constructor() {
     super();
     this.state = {
       //it really doesn't matter what you put in here
       width: 420,
       height: 420
     }
   }

   componentDidMount() {
    console.log('hi')
   }

   drawLayout() {

     let data = this.props.data;

     console.log(this.props.data)

     let {width, height} = this.state;

        // we create the faux element
        let el = new ReactFauxDOM.Element('div');
        // we set ref on our newly created element
        el.setAttribute("ref", "chart");

        // we attach the width and the height to our svg
        let svg = d3.select(el).append('svg')
                    .attr("width", width)
                    .attr("height", height);


         // we attach the width and the height to our svg
         let force = d3.layout.force()
                         .nodes(this.props.data.nodes)
                         .links(this.props.data.edges)
                         .size([width, height])
                         .linkDistance([50])        // <-- New!
                         .charge([-100])            // <-- New!
                         .start();

         let edges = svg.selectAll("line")
            .data(this.props.data.edges)
            .enter()
            .append("line")
            .style("stroke", "#ccc")
            .style("stroke-width", 1);

         let nodes = svg.selectAll("circle")
            .data(this.props.data.nodes)
            .enter()
            .append("circle")
            .attr("r", 10)
            .style("fill", function(d, i) {
                    return 'red';
            })
            .call(force.drag);

     force.on("tick", function() {

        edges.attr("x1", function(d) { return d.source.x; })
             .attr("y1", function(d) { return d.source.y; })
             .attr("x2", function(d) { return d.target.x; })
             .attr("y2", function(d) { return d.target.y; });

        nodes.attr("cx", function(d) { return d.x; })
             .attr("cy", function(d) { return d.y; });

     });


     return el.toReact();
   }

    render() {
      return (
         this.drawLayout()
      )
    }
  };

  export default ForceLayout