import React, { Component, useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";
import { cleanData } from "../data/cleanData";
import { cleanDataTrim } from "../data/cleanDataTrim";
import googleplaystoreData from "../data/googleplaystore.json";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [masterBarData, setMasterBarData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [keys, setKeys] = useState([]);
  useEffect(() => {
    const key = "Category";

    let arrayUniqueByKey = [
      ...new Map(googleplaystoreData.map((item) => [item[key], item])).values(),
    ];
    let k = [];
    for (let i = 0; i < arrayUniqueByKey.length; i++) {
      k.push(arrayUniqueByKey[i].Category);
    }
    setKeys(k);
    let arr = [];
    for (let i = 0; i < arrayUniqueByKey.length; i++) {
      arr[i] = {
        Category: arrayUniqueByKey[i].Category,
        "0-3 star": 0,
        roneColor: "hsl(229, 70%, 50%)",
        "3-4 star": 0,
        rtwoColor: "hsl(296, 70%, 50%)",
        "4-5 star": 0,
        rthreeColor: "hsl(97, 70%, 50%)",
      };
    }
    for (let i = 0; i < cleanData.length; i++) {
      let isCategory = (element) => {
        return element.Category === cleanData[i].Category;
      };
      let categoryIndex = arr.findIndex(isCategory);

      if (
        (cleanData[i].Rating >= 0 && cleanData[i].Rating <= 3) ||
        cleanData[i].Rating === "NaN"
      ) {
        arr[categoryIndex]["0-3 star"] += 1;
      } else if (cleanData[i].Rating > 3 && cleanData[i].Rating <= 4) {
        arr[categoryIndex]["3-4 star"] += 1;
      } else {
        arr[categoryIndex]["4-5 star"] += 1;
      }
    }
    setMasterBarData(arr);
    // less categories to show in dashboard since space is less
    let sliced = isDashboard ? arr.slice(0, 6) : arr.slice(0, 8);
    setBarData(sliced);
  }, []);
  const handleClick = (si, ei) => {
    let sliced = masterBarData.slice(si, ei);
    setBarData(sliced);
  };
  return (
    <>
      {!isDashboard && (
        <>
          <button onClick={() => handleClick(0, 8)}>1-8</button>
          <button onClick={() => handleClick(8, 16)}>8-16</button>
          <button onClick={() => handleClick(16, 24)}>16-24</button>
          <button onClick={() => handleClick(24, 34)}>24-33</button>{" "}
        </>
      )}

      <ResponsiveBar
        data={barData}
        theme={{
          tooltip: {
            container: {
              color: "#000",
            },
          },
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
        keys={["0-3 star", "3-4 star", "4-5 star"]}
        indexBy="Category"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", "1.6"]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "category",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Number of Apps",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
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
        role="application"
      />
    </>
  );
};

export default BarChart;
