import React, { useEffect, useState } from 'react';
import { Modal, Button, Input } from 'antd';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addVehicleType, editVehicleType } from '../../actions/cartypeactions';
const VehicleType = () => {
  const dispatch = useDispatch();
  const cartypes = useSelector((state) => state.cartypes);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vehicleTypeValue, setvehicleTypeValue] = useState('');
  const [newVehicleType, setnewVehicleType] = useState([]);
  const [vehicleTypes, setvehicleTypes] = useState([]);
  // const [enableChecked,setenableChecked]=useState()
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setvehicleTypeValue('');
    if (newVehicleType) {
      dispatch(addVehicleType(newVehicleType));
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    if (cartypes?.vehicleType) {
      setvehicleTypes(cartypes?.vehicleType);
      setnewVehicleType(cartypes?.vehicleType);
    }
  }, [cartypes?.vehicleType]);
  return (
    <div className="vehicle-type-container">
      <div className="vehicle-type-area">
        {vehicleTypes?.map((vehicle) => {
          return (
            <div className="vehicle-type-content">
              <Input
                className="vehicle-type"
                name={vehicle.name}
                value={vehicle.name}
                readOnly
              />
              <div className="vehicle-enable-checkbox">
                <input
                  type="checkbox"
                  name={vehicle.name}
                  checked={vehicle.enabled}
                  // onChange={(e) => {
                  //   const vehicleTypeIndex = vehicleTypes?.filter(
                  //     (vehicle1) => vehicle1.id === vehicle.id
                  //   );

                  //   if (e.target.checked) {
                  //     vehicleTypeIndex.enabled = true;
                  //     dispatch(
                  //       editVehicleType([
                  //         ...newVehicleType,
                  //         ...vehicleTypeIndex,
                  //       ])
                  //     );
                  //   } else {
                  //     vehicleTypeIndex.enabled = false;
                  //     dispatch(
                  //       editVehicleType([
                  //         ...newVehicleType,
                  //         ...vehicleTypeIndex,
                  //       ])
                  //     );
                  //   }
                  // }}
                />
                <label>Enabled</label>
              </div>
            </div>
          );
        })}
      </div>
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
          onBlur={(e) => {
            setnewVehicleType([
              ...newVehicleType,
              { id: uuid(), name: vehicleTypeValue, enabled: true },
            ]);
          }}
        />
      </Modal>
    </div>
  );
};

export default VehicleType;
