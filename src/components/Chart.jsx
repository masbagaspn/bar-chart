import * as d3 from "d3";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Chart({ dataset }) {
  const { data } = dataset;
  const chartRef = useRef();

  useEffect(() => {
    const padding = 20;
    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.6;
    const barWidth = (width - 2 * padding) / data.length;

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([padding + 20, width - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[1])])
      .range([height - padding, padding]);

    const dateArray = data.map((d) => new Date(d[0]));

    const xAxisScale = d3
      .scaleTime()
      .domain([d3.min(dateArray), d3.max(dateArray)])
      .range([padding + 20, width - padding]);

    const xAxis = d3.axisBottom(xAxisScale);
    const yAxis = d3.axisLeft(yScale);

    const tooltip = d3
      .select("#chart-container")
      .append("div")
      .attr("id", "tooltip")
      // .attr("data-date")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("width", "auto")
      .style("height", "auto")
      .style("background-color", "rgba(255, 255, 255, 0.9)")
      .style("font-size", "0.8rem")
      .style("padding", ".75rem")
      .style("border-radius", ".25rem")
      .style("left", width / 2 + "px")
      .style("top", height / 2 + "px")
      .style("box-shadow", "2px 2px 8px rgba(0,0,0,0.15)")
      .style("backdrop-filter", "blur(.5rem)")
      .style("pointer-events", "none");

    const svg = d3.select(chartRef.current);

    svg
      .selectAll("rect")
      .data(data)
      .join(
        (enter) => enter.append("rect"),
        (update) => update.attr("class", "bar"),
        (exit) => exit.remove()
      )
      .attr("class", "bar")
      .attr("id", (d, i) => "bar" + i)
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", barWidth)
      .attr("height", (d) => yScale(0) - yScale(d[1]))
      .attr("fill", "rgb(94 234 212)")
      .on("mouseover", (e, d) => {
        // "fill", "rgb(20 184 166)"
        const element = document.getElementById(e.target.id);
        element.style.fill = "rgb(20 184 166)";

        tooltip.transition().style("visibility", "visible");

        tooltip
          .html(`<p><b>${d[0]}<br>GDP: ${d[1]}<b></p>`)
          .attr("data-date", d[0])
          .style("position", "absolute")
          .style("left", e.clientX - 240 + "px")
          .style("top", e.clientY - 100 + "px");
      })
      .on("mouseout", (e) => {
        const element = document.getElementById(e.target.id);
        element.style.fill = "rgb(94 234 212)";

        tooltip.transition().style("visibility", "hidden");
      });
    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height - padding})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${padding + 20}, 0)`)
      .call(yAxis);
  }, [data]);

  return (
    <svg
      ref={chartRef}
      className="w-[80vw] h-[60vh] bg-white font-jakarta text-teal-700"
    />
  );
}

Chart.propTypes = {
  dataset: PropTypes.object.isRequired,
};

export default Chart;
