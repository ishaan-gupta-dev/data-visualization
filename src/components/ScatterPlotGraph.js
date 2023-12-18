import React, { Component, useEffect, useState, useMemo } from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { cleanData } from "../data/cleanData";
import { cleanDataTrim } from "../data/cleanDataTrim";

const ScatterPlotGraph = ({
  isCustomLineColors = false,
  isDashboard = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [scatterPlotData, setScatterPlotData] = useState([]);

  /* Use Memo to cache heavy data */

  /*
  const cachedScatterPlotData = useMemo(() => {
    let arr = [{ id: "all apps", data: [] }];
    for (let i = 0; i < cleanData.length; i++) {
      let x = cleanData[i].Rating;
      let y = cleanData[i].Reviews;
      let name = cleanData[i].App;
      if (x === "NaN") {
        continue;
      }
      arr[0].data.push({ x: x, y: y, name: name });
    }
    return arr;
  }, [cleanData]);
  */

  useEffect(() => {
    let arr = [{ id: "all apps", data: [] }];
    let sliced = cleanData.slice(0, 5000);
    for (let i = 0; i < sliced.length; i++) {
      let x = cleanData[i].Rating;
      let y = cleanData[i].Reviews;
      let name = cleanData[i].App;
      if (x === "NaN") {
        continue;
      }
      arr[0].data.push({ x: x, y: y, name: name });
    }
    setScatterPlotData(arr);
  }, []);

  return (
    <ResponsiveScatterPlot
      data={scatterPlotData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
      xScale={{ type: "linear", min: 0, max: "auto" }}
      xFormat=">-.2f"
      yScale={{ type: "linear", min: 0, max: "auto" }}
      yFormat=">-.2f"
      blendMode="normal"
      nodeSize={9}
      colors={{ scheme: "nivo" }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Rating",
        legendPosition: "middle",
        legendOffset: 46,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Number of Reviews",
        legendPosition: "middle",
        legendOffset: -60,
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 130,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 12,
          itemsSpacing: 5,
          itemDirection: "left-to-right",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default ScatterPlotGraph;
