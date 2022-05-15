import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import uuid from 'react-uuid';
import { TextField, Button, Select, MenuItem } from '@material-ui/core';
import { Formik } from 'formik';
import { addVehicle } from '../../actions/cartypeactions';

const AddVehicle = ({
  isModalVisible,
  setIsModalVisible,
  seteditKey,
  editKey,
}) => {
  const dispatch = useDispatch();
  const [uniqueID, setuniqueID] = useState(uuid());
  const cartypes = useSelector((state) => state.cartypes);
  const [vehicledata, setvehicledata] = useState([]);
  const [editedVehicle, seteditedVehicle] = useState([]);

  const [vehicleTypes, setvehicleTypes] = useState([]);
  const [vehicleTags, setvehicleTags] = useState([]);
  const [SelectedVehicle, setSelectedVehicle] = useState('none');
  const [selectedTags, setselectedTags] = useState('none');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    if (cartypes?.vehicleTags) {
      setvehicleTags(cartypes?.vehicleTags);
    }
    if (cartypes?.vehicleType) {
      setvehicleTypes(cartypes?.vehicleType);
    }
  }, [cartypes?.vehicleTags, cartypes?.vehicleType]);
  useEffect(() => {
    if (cartypes?.cars) {
      setvehicledata(cartypes?.cars);
    }
  }, [cartypes?.cars]);
  useEffect(() => {
    if (editKey) {
      seteditedVehicle(
        vehicledata?.filter((vehicle) => vehicle.key === editKey)
      );
    }
  }, [editKey]);
  console.log('editve', editedVehicle);
  console.log('kkey', editKey);
  return (
    <>
      <Button variant='contained' color='primary' onClick={showModal}>
        Add Vehicle
      </Button>
      <Modal
        title={editKey ? 'Edit Vehicle' : 'Add a New Vehicle'}
        visible={isModalVisible}
        //onOk={this.handleOk}
        onCancel={handleCancel}
        footer={null}
        height={700}
      >
        <Formik
          // enableReinitialize
          initialValues={{
            key: editKey ? editedVehicle[0]?.key : uniqueID,
            name: editKey ? editedVehicle[0]?.name : '',
            convenience_fees: editKey ? editedVehicle.convenience_fees : '',
            min_fare: editKey ? editedVehicle.min_fare : '',
            rate_per_hour: editKey ? editedVehicle.rate_per_hour : '',
            rate_per_kilometer: editKey ? editedVehicle.rate_per_kilometer : '',
            image: editKey ? editedVehicle.image : '',
            personSeats: editKey ? editedVehicle.personSeats : '',
            busiClass: editKey ? editedVehicle.busiClass : '',
            wheelChair: editKey ? editedVehicle.wheelChair : '',
            vehicleType: editKey ? editedVehicle.vehicleType : SelectedVehicle,
            vehicleTags: editKey ? editedVehicle.vehicleTags : selectedTags,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'required';
            }
            if (!values.convenience_fees) {
              errors.convenience_fees = 'required';
            }
            if (!values.min_fare) {
              errors.min_fare = 'required';
            }
            if (!values.rate_per_hour) {
              errors.rate_per_hour = 'required';
            }
            if (!values.rate_per_kilometer) {
              errors.rate_per_kilometer = 'required';
            }
            if (!values.image) {
              errors.image = 'required';
            }
            if (!values.busiClass) {
              errors.busiClass = 'required';
            }
            if (!values.personSeats) {
              errors.personSeats = 'required';
            }
            if (!values.wheelChair) {
              errors.wheelChair = 'required';
            }

            return errors;
          }}
          onSubmit={(values) => {
            console.log('dati', vehicledata);
            dispatch(addVehicle([...vehicledata, values]));
            setuniqueID(uuid());
            // resetForm({
            //   values: {
            //     key: uuid(),
            //   },
            // });
            setIsModalVisible(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                id='name'
                margin='dense'
                name='name'
                label='Vehicle Name'
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                style={{ marginRight: '20px' }}
              />

              <TextField
                margin='dense'
                type='number'
                id='convenience_fees'
                name='convenience_fees'
                label='Conenience fees'
                value={values.convenience_fees}
                onChange={handleChange}
                error={
                  touched.convenience_fees && Boolean(errors.convenience_fees)
                }
                helperText={touched.convenience_fees && errors.convenience_fees}
              />
              <TextField
                id='min_fare'
                margin='dense'
                type='number'
                name='min_fare'
                label='Minimum fare'
                value={values.min_fare}
                onChange={handleChange}
                error={touched.min_fare && Boolean(errors.min_fare)}
                helperText={touched.min_fare && errors.min_fare}
                style={{ marginRight: '20px' }}
              />
              <TextField
                id='rate_per_kilometer'
                margin='dense'
                type='number'
                name='rate_per_kilometer'
                label='Rate per kilo-meter'
                value={values.rate_per_kilometer}
                onChange={handleChange}
                error={
                  touched.rate_per_kilometer &&
                  Boolean(errors.rate_per_kilometer)
                }
                helperText={
                  touched.rate_per_kilometer && errors.rate_per_kilometer
                }
              />
              <TextField
                type='number'
                id='rate_per_hour'
                margin='dense'
                type='number'
                name='rate_per_hour'
                label='Rate per hour'
                value={values.rate_per_hour}
                onChange={handleChange}
                error={touched.rate_per_hour && Boolean(errors.rate_per_hour)}
                helperText={touched.rate_per_hour && errors.rate_per_hour}
                style={{ marginRight: '20px' }}
              />
              <TextField
                id='image'
                name='image'
                margin='dense'
                label='Image url'
                value={values.image}
                onChange={handleChange}
                error={touched.image && Boolean(errors.image)}
                helperText={touched.image && errors.image}
                style={{ marginRight: '20px' }}
              />

              <TextField
                id='personSeats'
                name='personSeats'
                margin='dense'
                type='number'
                label='People can be Sit'
                value={values.personSeats}
                onChange={handleChange}
                error={touched.personSeats && Boolean(errors.personSeats)}
                helperText={touched.personSeats && errors.personSeats}
                style={{ marginRight: '20px' }}
              />
              <TextField
                id='busiClass'
                name='busiClass'
                type='number'
                margin='dense'
                label='Business Class Seats'
                value={values.busiClass}
                onChange={handleChange}
                error={touched.busiClass && Boolean(errors.busiClass)}
                helperText={touched.busiClass && errors.busiClass}
                style={{ marginRight: '20px' }}
              />

              <Select
                name='vehicleType'
                style={{ marginRight: '20px' }}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={SelectedVehicle}
                onChange={(e) => {
                  setSelectedVehicle(e.target.value);
                }}
              >
                <MenuItem value='none'> Select Your Vehicle Type</MenuItem>
                {vehicleTypes?.filter((vehicle) => vehicle.enabled === true)
                  .length > 0 ? (
                  vehicleTypes?.map((vehicle, counter) => {
                    return (
                      <MenuItem key={counter} value={vehicle.name}>
                        {vehicle.name}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem disabled value='disabled'>
                    Vehicle type not Available{' '}
                  </MenuItem>
                )}
              </Select>

              <Select
                name='vehicleTags'
                style={{ marginTop: '20px' }}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={selectedTags}
                onChange={(e) => setselectedTags(e.target.value)}
              >
                <MenuItem value='none'> Select Your Vehicle Tags </MenuItem>
                {vehicleTags?.filter((tag) => tag.enabled === true).length >
                0 ? (
                  vehicleTags?.map((tagger, counter) => {
                    return (
                      <MenuItem key={counter} value={tagger.tagName}>
                        {tagger.tagName}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem disabled value='disabled'>
                    Vehicle tags not Available
                  </MenuItem>
                )}
              </Select>
              <TextField
                id='wheelChair'
                name='wheelChair'
                type='number'
                margin='dense'
                label='No of wheel chairs allowed'
                value={values.wheelChair}
                onChange={handleChange}
                error={touched.busiClass && Boolean(errors.wheelChair)}
                helperText={touched.wheelChair && errors.wheelChair}
                style={{ marginRight: '20px', marginTop: '10px' }}
              />
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button
                  variant='contained'
                  onClick={() => setIsModalVisible(false)}
                  style={{ marginRight: '10px' }}
                >
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  // onClick={() => setvehicledata([...vehicledata, values])}
                  type='submit'
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddVehicle;
