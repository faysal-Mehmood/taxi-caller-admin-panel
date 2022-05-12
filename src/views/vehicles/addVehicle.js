import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';
import { editVehicle } from '../../actions/cartypeactions';

const AddVehicle = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button variant='contained' color='primary' onClick={showModal}>
        Add Vehicle
      </Button>
      <Modal
        title='Add a New Vehicle'
        visible={isModalVisible}
        //onOk={this.handleOk}
        //onCancel={this.handleCancel}
        footer={null}
      >
        {' '}
        <Formik
          initialValues={{
            name: '',
            convenience_fees: '',
            min_fare: '',
            rate_per_hour: '',
            rate_per_kilometer: '',
            image: '',
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
            return errors;
          }}
          onSubmit={(values) => {
            dispatch(editVehicle([values]));
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
                fullWidth
                id='name'
                margin='dense'
                name='name'
                label='Vehicle Name'
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              <TextField
                fullWidth
                margin='dense'
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
                fullWidth
                id='min_fare'
                margin='dense'
                name='min_fare'
                label='Minimum fare'
                value={values.min_fare}
                onChange={handleChange}
                error={touched.min_fare && Boolean(errors.min_fare)}
                helperText={touched.min_fare && errors.min_fare}
              />
              <TextField
                fullWidth
                id='rate_per_kilometer'
                margin='dense'
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
                fullWidth
                type='number'
                id='rate_per_hour'
                margin='dense'
                name='rate_per_hour'
                label='Rate per hour'
                value={values.rate_per_hour}
                onChange={handleChange}
                error={touched.rate_per_hour && Boolean(errors.rate_per_hour)}
                helperText={touched.rate_per_hour && errors.rate_per_hour}
              />
              <TextField
                fullWidth
                id='image'
                name='image'
                margin='dense'
                label='Image url'
                value={values.image}
                onChange={handleChange}
                error={touched.image && Boolean(errors.image)}
                helperText={touched.image && errors.image}
              />
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button
                  variant='contained'
                  onClick={() => setIsModalVisible(false)}
                  style={{ marginRight: '10px' }}
                >
                  Cancel
                </Button>
                <Button variant='contained' color='primary' type='submit'>
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
