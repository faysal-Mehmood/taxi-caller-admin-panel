import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Button, Paper } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import InfoIcon from "@material-ui/icons/Info";
import AddIcon from "@material-ui/icons/Add";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import Map from "../components/Map";
import languageJson from "../config/language";

const search = [
  { id: "1", name: "Kapteeninkatu" },
  { id: "2", name: "Kapteeninkatu" },
  { id: "3", name: "Kapteeninkatu" },
  { id: "4", name: "Kapteeninkatu" },
  { id: "5", name: "Kapteeninkatu" },
  { id: "6", name: "Kapteeninkatu" },
  { id: "7", name: "Kapteeninkatu" },
  { id: "8", name: "Kapteeninkatu" },
  { id: "9", name: "Kapteeninkatu" },
  { id: "10", name: "Kapteeninkatu" },
  { id: "11", name: "Kapteeninkatu" },
  { id: "12", name: "Kapteeninkatu" },
  { id: "13", name: "Kapteeninkatu" },
  { id: "14", name: "Kapteeninkatu" },
  { id: "15", name: "Kapteeninkatu" },
  { id: "16", name: "Kapteeninkatu" },
  { id: "17", name: "Kapteeninkatu" },
  { id: "18", name: "Kapteeninkatu" },
  { id: "19", name: "Kapteeninkatu" },
  { id: "20", name: "Kapteeninkatu" },
];

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
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Tariffs = () => {
  const [value, setValue] = useState("1");
  const [mylocation, setMylocation] = useState(null);
  const [locations, setLocations] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (mylocation == null) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setMylocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        (err) => console.log(err)
      );
    }
  }, [mylocation]);

  return (
    <Box>
      <Box>
        <Box sx={{ borderTop: 1, borderColor: "primary" }}>
          <Tabs value={value} onChange={handleChange} indicatorColor="wite">
            <Tab
              className="tab-name"
              label={
                <Typography variant="p">
                  1. Zones <InfoIcon style={{ marginLeft: "6px" }} />
                </Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              className="tab-name"
              label={
                <Typography variant="p">
                  2. Schedule <InfoIcon style={{ marginLeft: "6px" }} />
                </Typography>
              }
              {...a11yProps(1)}
            />
            <Tab
              className="tab-name"
              label={
                <Typography variant="p">
                  3. Tariffs <InfoIcon style={{ marginLeft: "6px" }} />
                </Typography>
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box display="flex">
            <Box width="300px">
              <Typography variant="body2" style={{ marginBottom: "8px" }}>
                Tariff zones
              </Typography>
              <Divider />
              <Box height="500px" style={{ overflowY: "scroll" }}>
                {search.map((item, index) => {
                  return (
                    <Box key={item.id} display="flex" justifyContent="space-between" my="18px">
                      <Typography variant="p">{index}.</Typography>
                      <Typography variant="p" style={{ marginRight: "45px" }}>
                        {item.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
              <Box mt={2} display="flex" justifyContent="space-around">
                <Button
                  variant="contained"
                  color="default"
                  className="tariffs-button"
                  startIcon={<AddIcon />}
                >
                  New Zone
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  className="tariffs-button"
                  startIcon={<CreateNewFolderIcon />}
                >
                  import/export
                </Button>
              </Box>
            </Box>
            {mylocation ? (
              <Paper style={{ width: "100%", marginTop: "25px" }}>
                <Typography
                  variant="h6"
                  style={{ height: ".5px", backgroundColor: "#000" }}
                ></Typography>
                <Map
                  mapcenter={mylocation}
                  locations={locations}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCyQOrr2WrxFZ8GPqlB4m1vBcM6NEkoshA&v=3.exp&libraries=geometry,drawing,place  s"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `100%` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </Paper>
            ) : (
              <Typography variant="h4" style={{ margin: "20px 0 0 15px", color: "#FF0000" }}>
                {languageJson.allow_location}
              </Typography>
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Tariffs;

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
