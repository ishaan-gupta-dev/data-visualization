import { Box } from "@mui/material";
import Header from "../../components/Header";
import ScatterPlotGraph from "../../components/ScatterPlotGraph";

const ScatterPlot = () => {
  return (
    <Box m="20px">
      <Header
        title="Scatter Plot Graph"
        subtitle="Scatter Plot Graph to visualize the rating of all apps against their number of reviews, the apps in the extreme of both axis represent the best apps while those on the inner side require improvement"
      />
      <Box height="75vh">
        <ScatterPlotGraph />
      </Box>
    </Box>
  );
};

export default ScatterPlot;
