import React, { Component, useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GradeIcon from "@mui/icons-material/Grade";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import NumbersIcon from "@mui/icons-material/Numbers";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import PieChart from "../../components/PieChart";
import PieChartTwo from "../../components/PieChartTwo";
import PieChartThree from "../../components/PieChartThree";
import { cleanDataTrim } from "../../data/cleanDataTrim";
import { cleanData } from "../../data/cleanData";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalApps, setTotalApps] = useState(null);
  const [averageSizeofApp, setAverageSizeofApp] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [mostExpensiveApp, setMostExpensiveApp] = useState(null);
  const [lastUpdated, setLastUpdated] = useState([]);
  useEffect(() => {
    setTotalApps(cleanData.length);
    setLastUpdated(
      cleanData
        .sort((a, b) => b["Last Updated"] - a["Last Updated"])
        .slice(0, 8)
    );
    let sumAverageSizeofApp = 0;
    let sumAverageRating = 0;
    let mostExpensive = {
      name: cleanData[0].App,
      price: cleanData[0].Price,
    };
    for (let i = 0; i < cleanData.length; i++) {
      let numSize = parseFloat(cleanData[i].Size.slice(0, -1));
      if (!isNaN(numSize)) {
        sumAverageSizeofApp += numSize;
      }
      if (cleanData[i].Rating !== "NaN") {
        sumAverageRating += cleanData[i].Rating;
      }
      let p;
      if (typeof cleanData[i].Price == "string") {
        p = parseFloat(cleanData[i].Price.slice(1));
      } else {
        p = cleanData[i].Price;
      }
      if (p > mostExpensive.price) {
        mostExpensive.name = cleanData[i].App;
        mostExpensive.price = p;
      }
    }
    let a = sumAverageSizeofApp / cleanData.length;
    let r = sumAverageRating / cleanData.length;
    setAverageSizeofApp(a.toFixed(2));
    setAverageRating(r.toFixed(2));
    setMostExpensiveApp(mostExpensive);
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalApps}
            subtitle="Total Apps"
            progress="0.75"
            increase="+14%"
            icon={
              <NumbersIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={averageSizeofApp + "M"}
            subtitle="Average Size of Apps"
            progress="0.50"
            increase="+21%"
            icon={
              <LineWeightIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={averageRating}
            subtitle="Average Rating"
            progress="0.30"
            increase="+5%"
            icon={
              <GradeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={
              "$" +
              mostExpensiveApp?.price +
              "\n" +
              "(" +
              mostExpensiveApp?.name +
              ")"
            }
            subtitle={"Most Expensive App"}
            progress="0.80"
            increase="+43%"
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Rating across various categories
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* <LineChart isDashboard={true} /> */}
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Last Updated
            </Typography>
          </Box>
          {lastUpdated.map((item, i) => (
            <Box
              key={`${item.App}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {item.App}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {numberWithCommas(item.numInstall) + "+ installs"}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{item["Last Updated"]}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {item.Rating}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Trending Android Version
          </Typography>
          <Box height="250px" mt="-20px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Trending Content Rating
          </Typography>
          <Box height="250px" mt="-20px">
            <PieChartTwo isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sentiments
          </Typography>
          <Box height="250px" mt="-20px">
            <PieChartThree isDashboard={true} />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
