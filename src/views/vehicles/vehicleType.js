import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { addVehicleType } from "../../actions/cartypeactions";
const VehicleType = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vehicleTypeValue, setvehicleTypeValue] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(addVehicleType({ name: vehicleTypeValue }));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Input placeholder="raja" value="sahib" />
      <Button type="primary" onClick={showModal}>
        New type
      </Button>
      <Modal
        title="Add New Vehicle Type"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          name="vehicle type"
          placeholder="Enter Vehicle type"
          value={vehicleTypeValue}
          onChange={(e) => setvehicleTypeValue(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default VehicleType;
