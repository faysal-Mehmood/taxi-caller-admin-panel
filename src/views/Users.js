import React, { useState, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'react-redux';
import CircularLoading from '../components/CircularLoading';
import Usertable from './components/usertable/usertable';
// tabpane component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
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

export default function Users() {
  const [data, setData] = useState([]);
  const [cars, setCars] = useState({});
  const [adminData, setadminData] = useState();
  const [driverData, setdriverData] = useState();
  const usersdata = useSelector((state) => state.usersdata);
  const cartypes = useSelector((state) => state.cartypes);
  const [tabvalue, settabValue] = useState('Admin');
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    settabValue(newValue);
  };
  useEffect(() => {
    if (usersdata.users) {
      setData(usersdata.users);
    }
  }, [usersdata.users]);
  console.log('userdata', data);
  useEffect(() => {
    if (cartypes.cars) {
      let obj = {};
      console.log(cartypes.cars);
      cartypes.cars.map((car) => (obj[car.name] = car.name));
      setCars(obj);
    }
  }, [cartypes.cars]);
  useEffect(() => {
    if (data.length) {
      setadminData(data?.filter((item) => item.usertype === 'Admin'));
      setdriverData(data?.filter((item) => item.usertype === 'driver'));
    }
  }, [data]);

  return (
    <>
      <>
        <Tabs
          value={tabvalue}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          {data
            ?.filter(
              (v, i, a) => a.findIndex((v2) => v2.usertype === v.usertype) === i
            )
            ?.map((user, counter) => {
              return <Tab label={user.usertype} value={user.usertype} />;
            })}
        </Tabs>

        <TabPanel value={tabvalue} index='Admin'>
          {usersdata.loading ? (
            <CircularLoading />
          ) : (
            <Usertable data={adminData} car={cars} />
          )}
        </TabPanel>
        <TabPanel value={tabvalue} index='driver'>
          {usersdata.loading ? (
            <CircularLoading />
          ) : (
            <Usertable data={driverData} car={cars} />
          )}
        </TabPanel>
      </>
    </>
  );
}
