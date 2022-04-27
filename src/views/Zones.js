import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Box,
  Typography,
  Button,
  MenuItem,
  TextField,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@material-ui/core";
import languageJson from "../config/language";
import CloseIcon from "@material-ui/icons/Close";
import Map from "../components/Map";

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
];
const currencies = [
  {
    value: "Unrestricted",
    label: "Unrestricted",
  },
  {
    value: "Only zone chain",
    label: "Only zone chain",
  },
  {
    value: "500 m",
    label: "500 m",
  },
  {
    value: "1 KM",
    label: "1 KM",
  },
  {
    value: "1.5 KM",
    label: "1.5 KM",
  },
  {
    value: "2 KM",
    label: "2 KM",
  },
  {
    value: "3 KM",
    label: "3 KM",
  },
  {
    value: "5 KM",
    label: "5 KM",
  },
  {
    value: "10 KM",
    label: "10 KM",
  },
  {
    value: "15 KM",
    label: "15 KM",
  },
  {
    value: "20 KM",
    label: "20 KM",
  },
  {
    value: "30 KM",
    label: "30 KM",
  },
  {
    value: "40 KM",
    label: "40 KM",
  },
  {
    value: "50 KM",
    label: "50 KM",
  },
];
const Zones = () => {
  const [currency, setCurrency] = useState("Unrestricted");
  const [mylocation, setMylocation] = useState(null);
  const [locations, setLocations] = useState([]);

  const handleChange = (event) => {
    setCurrency(event.target.value);
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
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">{languageJson.zones_title_heading}</Typography>
        <Box>
          <Button
            variant="contained"
            style={{
              backgroundColor: "rgb(253, 217, 67)",
              color: "#000",
              borderRadius: "23px",
              marginRight: "5px",
            }}
          >
            {languageJson.zones_import_button}
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "blue", color: "#000", borderRadius: "23px" }}
          >
            {languageJson.zones_save_button}
          </Button>
        </Box>
      </Box>
      <Box style={{ maxWidth: "990px" }}>
        <Typography variant="p">{languageJson.zones_title_description}</Typography>
      </Box>
      <Box display="flex">
        <Box display="flex" mt="25px">
          <Box>
            <TextField
              id="standard-basic"
              label={languageJson.zone_search_text}
              variant="standard"
            />

            <Box mt="23px" height="400px" style={{ overflowY: "scroll" }}>
              {search.map((item, index) => {
                return (
                  <Box key={item.id} display="flex" my="20px">
                    <Typography variant="p" style={{ marginRight: "20px" }}>
                      {index}.
                    </Typography>
                    <Typography variant="p" style={{ marginRight: "15px" }}>
                      {item.name}
                    </Typography>
                    <CloseIcon />
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box px="20px" width="300px" height="480px" style={{ overflowY: "scroll" }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb="25px">
              <Typography variant="p" style={{ marginRight: "40px" }}>
                ID
              </Typography>
              <TextField
                id="outlined-number"
                type="number"
                variant="outlined"
                className="zone-input"
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb="25px">
              <Typography variant="p" style={{ marginRight: "20px" }}>
                Code
              </Typography>
              <TextField
                id="outlined-number"
                type="text"
                variant="outlined"
                className="zone-input"
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb="25px">
              <Typography variant="p" style={{ marginRight: "20px" }}>
                Name
              </Typography>
              <TextField
                id="outlined-number"
                type="text"
                variant="outlined"
                className="zone-input"
              />
            </Box>

            <Typography variant="h6" style={{ marginTop: "25px" }}>
              ADVANCED
            </Typography>

            <Typography variant="h6" style={{ marginTop: "10px" }}>
              Require password enter flight
            </Typography>

            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="pick-up" />
            </FormGroup>

            <Typography variant="p" style={{ marginTop: "25px" }}>
              Set assignment
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb="30px"
              mt="20px"
            >
              <Typography variant="p" style={{ marginRight: "20px" }}>
                Search
              </Typography>
              <TextField
                id="outlined-select-currency"
                variant="outlined"
                select
                value={currency}
                onChange={handleChange}
                className="zone-input"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Typography variant="p" style={{ marginTop: "25px" }}>
              Assign from zones in this order
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb="10px"
              mt="20px"
            >
              <Typography variant="p" style={{ marginRight: "20px" }}>
                1.
              </Typography>
              <TextField
                id="outlined-select-currency"
                variant="outlined"
                select
                value={currency}
                onChange={handleChange}
                className="zone-input"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Is taxi rank" />
            </FormGroup>

            <Button
              variant="contained"
              style={{
                backgroundColor: "rgb(253, 217, 67)",
                color: "#000",
                borderRadius: "23px",
                marginRight: "5px",
                marginTop: "15px",
              }}
            >
              DONE
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
              loadingElement={<div style={{ height: `480px` }} />}
              containerElement={<div style={{ height: `480px` }} />}
              mapElement={<div style={{ height: `480px` }} />}
            />
          </Paper>
        ) : (
          <Typography variant="h4" style={{ margin: "20px 0 0 15px", color: "#FF0000" }}>
            {languageJson.allow_location}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default Zones;
