import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
//custom components
import Vehicles from "./vehicles";
import VehicleType from "./vehicleType";
import VehicleTags from "./vehicleTags";
import VehicleArchive from "./vehicleAchive";
// tabpane component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const Index = () => {
  const [tabvalue, settabValue] = useState("0");
  const handleChange = (event, newValue) => {
    settabValue(newValue);
  };
  return (
    <Paper square>
      <Tabs
        value={tabvalue}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Vehicles" value="0" />
        <Tab label="Vehicles Type" value="1" />
        <Tab label="Tags" value="2" />
        <Tab label="Archive" value="3" />
      </Tabs>
      <TabPanel value={tabvalue} index="0">
        <Vehicles />
      </TabPanel>
      <TabPanel value={tabvalue} index="1">
        <VehicleType />
      </TabPanel>
      <TabPanel value={tabvalue} index="2">
        <VehicleTags />
      </TabPanel>
      <TabPanel value={tabvalue} index="3">
        <VehicleArchive />
      </TabPanel>
    </Paper>
  );
};

export default Index;
