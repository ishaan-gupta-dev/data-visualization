import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChartThree from "../../components/PieChartThree";

const Pie = () => {
  return (
    <Box m="20px">
      <Header
        title="Pie Chart"
        subtitle="Pie Chart to visualize the overall sentiments on app reviews so that investers can know if the app is performing well or not in the market"
      />
      <Box height="75vh">
        <PieChartThree />
      </Box>
    </Box>
  );
};

export default Pie;
