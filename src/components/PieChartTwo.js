import React, { Component, useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../data/mockData";
import { cleanData } from "../data/cleanData";

const PieChartTwo = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pieDataTwo, setPieDataTwo] = useState([]);
  useEffect(() => {
    let num1 = 0;
    let num2 = 0;
    let num3 = 0;
    let num4 = 0;
    let num5 = 0;
    let num6 = 0;
    for (let i = 0; i < cleanData.length; i++) {
      if (cleanData[i]["Content Rating"] === "Everyone") {
        num1 += 1;
      } else if (cleanData[i]["Content Rating"] === "Everyone 10+") {
        num2 += 1;
      } else if (cleanData[i]["Content Rating"] === "Teen") {
        num3 += 1;
      } else if (cleanData[i]["Content Rating"] === "Mature 17+") {
        num4 += 1;
      } else if (cleanData[i]["Content Rating"] === "Adults only 18+") {
        num5 += 1;
      } else if (cleanData[i]["Content Rating"] === "Unrated") {
        num6 += 1;
      }
    }
    let pieData2 = [
      {
        id: "1",
        label: "Everyone",
        value: num1,
        color: "hsl(104, 70%, 50%)",
      },
      {
        id: "2",
        label: "Everyone 10+",
        value: num2,
        color: "hsl(162, 70%, 50%)",
      },
      {
        id: "3",
        label: "Teen",
        value: num3,
        color: "hsl(291, 70%, 50%)",
      },
      {
        id: "4",
        label: "Mature 17+",
        value: num4,
        color: "hsl(2, 60%, 10%)",
      },
      {
        id: "5",
        label: "Adults only 18+",
        value: num5,
        color: "hsl(229, 70%, 50%)",
      },
      {
        id: "6",
        label: "Unrated",
        value: num6,
        color: "hsl(172, 70%, 50%)",
      },
    ];
    setPieDataTwo(pieData2);
  }, []);

  return (
    <ResponsivePie
      data={pieDataTwo}
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
          itemsSpacing: isDashboard ? -30 : 0,
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
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChartTwo;
