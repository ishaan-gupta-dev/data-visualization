import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChartTwo from "../../components/PieChartTwo";

const Pie = () => {
  return (
    <Box m="20px">
      <Header
        title="Pie Chart"
        subtitle="Pie Chart to visualize what percentage of apps  fall under the various Content Rating so that investers can know which types of apps are trending in market"
      />
      <Box height="75vh">
        <PieChartTwo />
      </Box>
    </Box>
  );
};

export default Pie;
