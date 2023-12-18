import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import AllData from "./scenes/allData";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import PieTwo from "./scenes/pieTwo";
import PieThree from "./scenes/pieThree";
import ScatterPlot from "./scenes/scatterPlot";
import Line from "./scenes/line";
import Geography from "./scenes/geography";
import Sidebar from "./scenes/global/Sidebar";
import googleplaystoreData from "./data/googleplaystore.json";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  /* Logic to clean the Data before use, since data is big, saved it as json in local file */
  /*
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < googleplaystoreData.length; i++) {
      // let numInstall = googleplaystoreData[i].Installs.slice(0, -1);
      // console.log("App=========", googleplaystoreData[i].App);
      // let lastChar = googleplaystoreData[i].Installs.slice(-1);
      // console.log("lastChar", lastChar);
      // console.log(typeof googleplaystoreData[i].Installs !== "number");
      let numInstall =
        typeof googleplaystoreData[i].Installs !== "number"
          ? parseInt(
              googleplaystoreData[i].Installs.slice(0, -1).replace(/,/g, "")
            )
          : googleplaystoreData[i].Installs;
      // console.log("numInstall=========", numInstall);
      let numAndroid = parseInt(googleplaystoreData[i]["Android Ver"][0]);
      // console.log("numAndroid=========", numAndroid);
      let updatedObj = {
        ...googleplaystoreData[i],
        numInstall: numInstall,
        numAndroid: numAndroid,
      };
      delete updatedObj.Installs;
      delete updatedObj["Android Ver"];
      arr.push(updatedObj);
    }
    console.log(arr);
    setCleanData(arr);
  }, []);
  */

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/allData" element={<AllData />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/pieTwo" element={<PieTwo />} />
              <Route path="/pieThree" element={<PieThree />} />
              <Route path="/scatter" element={<ScatterPlot />} />
              <Route path="/line" element={<Line />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
