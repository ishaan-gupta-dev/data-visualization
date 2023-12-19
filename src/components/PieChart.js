import React, { Component, useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../data/mockData";
import { cleanData } from "../data/cleanData";

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pieDataOne, setPieDataOne] = useState([]);
  useEffect(() => {
    let sum4 = 0;
    let sum3 = 0;
    let sum2 = 0;
    let sum1 = 0;
    for (let i = 0; i < cleanData.length; i++) {
      if (cleanData[i].numAndroid === 4) {
        sum4 += cleanData[i].numInstall;
      } else if (cleanData[i].numAndroid === 3) {
        sum3 += cleanData[i].numInstall;
      } else if (cleanData[i].numAndroid === 2) {
        sum2 += cleanData[i].numInstall;
      } else if (cleanData[i].numAndroid === 1) {
        sum1 += cleanData[i].numInstall;
      }
    }
    let pieData = [
      {
        id: "4",
        label: "Android 4+",
        value: sum4,
        color: "hsl(104, 70%, 50%)",
      },
      {
        id: "3",
        label: "Android  3+",
        value: sum3,
        color: "hsl(162, 70%, 50%)",
      },
      {
        id: "2",
        label: "Android 2+",
        value: sum2,
        color: "hsl(291, 70%, 50%)",
      },
      {
        id: "1",
        label: "Android 1+",
        value: sum1,
        color: "hsl(229, 70%, 50%)",
      },
    ];

    setPieDataOne(pieData);
  }, []);

  return (
    <ResponsivePie
      data={pieDataOne}
      color={{ scheme: "nivo" }}
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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: isDashboard ? -10 : 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: isDashboard ? "top-to-bottom" : "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: theme.palette.mode == "dark" ? "#FFF" : "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
