import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { TextField, Button, Select, MenuItem, InputLabel } from "@material-ui/core";
import { Formik } from "formik";
import { addVehicle } from "../../actions/cartypeactions";

const AddVehicle = () => {
  const dispatch = useDispatch();
  const cartypes = useSelector((state) => state.cartypes);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vehicleTypes, setvehicleTypes] = useState([]);
  const [vehicleTags, setvehicleTags] = useState([]);
  const [SelectedVehicle, setSelectedVehicle] = useState("none");
  const [selectedTags, setselectedTags] = useState("none");

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

  return (
    <>
      <Button variant="contained" color="primary" onClick={showModal}>
        Add Vehicle
      </Button>
      <Modal
        title="Add a New Vehicle"
        visible={isModalVisible}
        //onOk={this.handleOk}
        // onCancel={this.handleCancel}
        footer={null}
        // width={700}
      >
        {" "}
        <Formik
          initialValues={{
            name: "",
            convenience_fees: "",
            min_fare: "",
            rate_per_hour: "",
            rate_per_kilometer: "",
            image: "",
            personSeats: "",
            busiClass: "",
            wheelChair: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "required";
            }
            if (!values.convenience_fees) {
              errors.convenience_fees = "required";
            }
            if (!values.min_fare) {
              errors.min_fare = "required";
            }
            if (!values.rate_per_hour) {
              errors.rate_per_hour = "required";
            }
            if (!values.rate_per_kilometer) {
              errors.rate_per_kilometer = "required";
            }
            if (!values.image) {
              errors.image = "required";
            }
            if (!values.busiClass) {
              errors.busiClass = "required";
            }
            if (!values.personSeats) {
              errors.personSeats = "required";
            }
            if (!values.wheelChair) {
              errors.wheelChair = "required";
            }

            return errors;
          }}
          onSubmit={(values) => {
            dispatch(addVehicle([values]));
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
                id="name"
                margin="dense"
                name="name"
                label="Vehicle Name"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                style={{ marginRight: "20px" }}
              />

              <TextField
                margin="dense"
                id="convenience_fees"
                name="convenience_fees"
                label="Conenience fees"
                value={values.convenience_fees}
                onChange={handleChange}
                error={touched.convenience_fees && Boolean(errors.convenience_fees)}
                helperText={touched.convenience_fees && errors.convenience_fees}
              />
              <TextField
                id="min_fare"
                margin="dense"
                name="min_fare"
                label="Minimum fare"
                value={values.min_fare}
                onChange={handleChange}
                error={touched.min_fare && Boolean(errors.min_fare)}
                helperText={touched.min_fare && errors.min_fare}
                style={{ marginRight: "20px" }}
              />
              <TextField
                id="rate_per_kilometer"
                margin="dense"
                name="rate_per_kilometer"
                label="Rate per kilo-meter"
                value={values.rate_per_kilometer}
                onChange={handleChange}
                error={touched.rate_per_kilometer && Boolean(errors.rate_per_kilometer)}
                helperText={touched.rate_per_kilometer && errors.rate_per_kilometer}
              />
              <TextField
                type="number"
                id="rate_per_hour"
                margin="dense"
                name="rate_per_hour"
                label="Rate per hour"
                value={values.rate_per_hour}
                onChange={handleChange}
                error={touched.rate_per_hour && Boolean(errors.rate_per_hour)}
                helperText={touched.rate_per_hour && errors.rate_per_hour}
                style={{ marginRight: "20px" }}
              />
              <TextField
                id="image"
                name="image"
                margin="dense"
                label="Image url"
                value={values.image}
                onChange={handleChange}
                error={touched.image && Boolean(errors.image)}
                helperText={touched.image && errors.image}
                style={{ marginRight: "20px" }}
              />

              <TextField
                id="personSeats"
                name="personSeats"
                margin="dense"
                label="People can be Sit"
                value={values.personSeats}
                onChange={handleChange}
                error={touched.personSeats && Boolean(errors.personSeats)}
                helperText={touched.personSeats && errors.personSeats}
                style={{ marginRight: "20px" }}
              />
              <TextField
                id="busiClass"
                name="busiClass"
                margin="dense"
                label="Business Class Seats"
                value={values.busiClass}
                onChange={handleChange}
                error={touched.busiClass && Boolean(errors.busiClass)}
                helperText={touched.busiClass && errors.busiClass}
                style={{ marginRight: "20px" }}
              />

              <TextField
                id="wheelChair"
                name="wheelChair"
                margin="dense"
                label="Wheel Chair can be place"
                value={values.wheelChair}
                onChange={handleChange}
                error={touched.busiClass && Boolean(errors.wheelChair)}
                helperText={touched.wheelChair && errors.wheelChair}
                style={{ marginRight: "20px" }}
              />
              <Select
                style={{ marginRight: "20px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={SelectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
              >
                <MenuItem value="none"> Select Your Vehicle Type</MenuItem>
                {vehicleTypes?.map((vehicle, counter) => {
                  return (
                    <MenuItem key={counter} value={vehicle.name}>
                      {vehicle.name}
                    </MenuItem>
                  );
                })}
              </Select>

              <Select
                style={{ marginTop: "20px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedTags}
                onChange={(e) => setselectedTags(e.target.value)}
              >
                <MenuItem value="none"> Select Your Vehicle Tags </MenuItem>
                {vehicleTags?.map((tagger, counter) => {
                  return (
                    <MenuItem key={counter} value={tagger.name}>
                      {tagger.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Button variant="contained" onClick={() => setIsModalVisible(false)}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type={isSubmitting}>
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
