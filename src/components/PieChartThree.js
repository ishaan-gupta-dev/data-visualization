import React, { Component, useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../data/mockData";
import { cleanData } from "../data/cleanData";
import userReview from "../data/googleplaystore_user_reviews.json";

const PieChartThree = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pieDataThree, setPieDataThree] = useState([]);
  useEffect(() => {
    let sumPositive = 0;
    let sumNegative = 0;
    let sumNeutral = 0;
    for (let i = 0; i < userReview.length; i++) {
      if (userReview[i].Sentiment === "Positive") {
        sumPositive += 1;
      } else if (userReview[i].Sentiment === "Negative") {
        sumNegative += 1;
      } else {
        sumNeutral += 1;
      }
    }
    let pieData3 = [
      {
        id: "1",
        label: "Positive Sentiment",
        value: sumPositive,
        color: "hsl(104, 70%, 50%)",
      },
      {
        id: "2",
        label: "Negative Sentiment",
        value: sumNegative,
        color: "hsl(162, 70%, 50%)",
      },
      {
        id: "3",
        label: "Neutral Sentiment",
        value: sumNeutral,
        color: "hsl(291, 70%, 50%)",
      },
    ];
    setPieDataThree(pieData3);
  }, []);

  return (
    <ResponsivePie
      data={pieDataThree}
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
          itemsSpacing: 50,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
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

export default PieChartThree;
