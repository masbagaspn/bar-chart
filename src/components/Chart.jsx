import * as d3 from "d3";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Chart({ dataset }) {
  const { data } = dataset;
  const chartRef = useRef();
  useEffect(() => {
    const padding = { bottom: 20, top: 40, left: 20, right: 20 };
    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.8;

    const xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[1])])
      .range([height - padding.top, padding.bottom]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const svg = d3.select(chartRef.current);

    svg
      .selectAll("rect")
      .data(data)
      .join(
        (enter) => enter.append("rect"),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      )
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d[1]))
      .attr("fill", "rgb(94 234 212)");
  }, [data]);

  return <svg ref={chartRef} className="w-[80vw] h-[80vh] " />;
}

Chart.propTypes = {
  dataset: PropTypes.object.isRequired,
};

export default Chart;
