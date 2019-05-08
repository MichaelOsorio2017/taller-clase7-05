import React, {Component} from 'react';
import * as d3 from  'd3';
import datos from './data.json'

class Auxiliar extends Component{
 
      componentDidMount(){
        this.createBobbleChart();
    }

    componentDidUpdate(){
        this.createBobbleChart();
    }

    createBobbleChart(){
        //Dimensión y margenes
        const margen = {top: 40, right: 150, bottom: 60, left: 30},
        width = window.innerWidth - margen.left - margen.right,
        height = 400 - margen.top - margen.bottom;

        const svg = d3.select("#auxiliar")
                    .append("svg")
                    .attr("width", width + margen.left + margen.right)
                    .attr("height", height + margen.top + margen.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margen.left + "," + margen.top + ")");
                    console.log("A punto de cargar datos")
                    
                    //X axis
                    const xAxis = d3.scaleLinear()
                                .domain([0,50000])
                                .range([0, width]);
                    svg.append("g")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(xAxis));
                    //Y axis
                    const yAxis = d3.scaleLinear()
                                .domain([35,90])
                                .range([height, 0]);
                    svg.append("g")
                        .call(d3.axisLeft(yAxis));
            
                    var z = d3.scaleSqrt()
                            .domain([200000, 1310000000])
                            .range([2, 30]);
                    var color = d3.scaleOrdinal()
                                .domain(["Europe", "Africa", "Oceania","Asia","Americas"])
                                .range(d3.schemeSet2);
                    //**********Circulos */
                    var tooltip = d3.select("#auxiliar")
                                .append("div")
                                .style("opacity", 0)
                                .attr("class", "tooltip")
                                .style("background-color", "black")
                                .style("border-radius", "5px")
                                .style("padding", "10px")
                                .style("color", "white")
            
                    var showTooltip = function(d) {
                        tooltip
                            .transition()
                            .duration(200)
                        tooltip
                            .style("opacity", 1)
                            .html("Country: " + d.country)
                            .style("left", (d3.mouse(this)[0]+30) + "px")
                            .style("top", (d3.mouse(this)[1]+30) + "px")
                        }
                        var moveTooltip = function(d) {
                        tooltip
                            .style("left", (d3.mouse(this)[0]+30) + "px")
                            .style("top", (d3.mouse(this)[1]+30) + "px")
                        }
                        var hideTooltip = function(d) {
                        tooltip
                            .transition()
                            .duration(200)
                            .style("opacity", 0)
                        }
                    svg.append("g")
                        .selectAll("dot")
                        .data(datos)
                        .enter()
                        .text((pais) => {return pais.country})
                        .append("circle")
                        .attr("class", (pais) => {return "bubbles " + pais.continent})
                        .attr("cx", (pais) =>{return xAxis(pais.purchasingPower);})
                        .attr("cy", (pais) =>{return yAxis(pais.lifeExpectancy); })
                        .attr("r", (pais)=>{return z(pais.population); })
                        .style("fill", (pais)=> {return color(pais.continent);})
                        .on("mouseover", showTooltip )
                        .on("mousemove", moveTooltip )
                        .on("mouseleave", hideTooltip );
        // d3.json("data.json", function(data){

        // })    

    }
  render(){
      return(
          <div id="auxiliar" style ={{marginLeft:30}}>
            <p>Michael Osorio - 201616273</p>
          </div>
      );
  }
  
}

export default Auxiliar;

