import React, { useEffect, useState } from 'react';
import { Modal, Button, Input } from 'antd';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { editVehicleType } from '../../actions/cartypeactions';
const VehicleType = () => {
  const dispatch = useDispatch();
  const cartypes = useSelector((state) => state.cartypes);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vehicleTypeValue, setvehicleTypeValue] = useState('');
  const [newVehicleType, setnewVehicleType] = useState([]);
  const [vehicleTypes, setvehicleTypes] = useState([]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setvehicleTypeValue('');
    if (newVehicleType) {
      dispatch(editVehicleType(newVehicleType));
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
    <div className='vehicle-type-container'>
      <div className='vehicle-type-area'>
        {vehicleTypes?.length > 0 ? (
          vehicleTypes?.map((vehicle) => {
            return (
              <div className='vehicle-type-content'>
                <Input
                  className='vehicle-type'
                  name={vehicle.name}
                  value={vehicle.name}
                  readOnly
                />
                <div className='vehicle-enable-checkbox'>
                  <input
                    type='checkbox'
                    name={vehicle.name}
                    checked={vehicle.enabled}
                    onChange={(e) => {
                      const vehicleTypeIndex = newVehicleType?.filter(
                        (vehicle1) => vehicle1.id === vehicle.id
                      );
                      if (e.target.checked) {
                        vehicleTypeIndex[0].enabled = true;
                        setnewVehicleType([
                          ...newVehicleType,
                          vehicleTypeIndex[0],
                        ]);
                      } else {
                        vehicleTypeIndex[0].enabled = false;
                        setnewVehicleType([
                          ...newVehicleType,
                          vehicleTypeIndex[0],
                        ]);
                      }

                      dispatch(editVehicleType(newVehicleType));
                    }}
                  />
                  <label>Enabled</label>
                  <label
                    className='del-icon'
                    onClick={(e) => {
                      const filteredtypes = vehicleTypes?.filter(
                        (vehicle1) => vehicle1.id !== vehicle.id
                      );
                      dispatch(editVehicleType(filteredtypes));
                    }}
                  >
                    x
                  </label>
                </div>
              </div>
            );
          })
        ) : (
          <p>No vehicle type Available</p>
        )}
        {/* {cartypes?.error?.flag && <p>{cartypes?.error?.msg}</p>} */}
      </div>
      <Button type='primary' onClick={showModal}>
        New type
      </Button>
      <Modal
        title='Add New Vehicle Type'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          name='vehicle type'
          placeholder='Enter Vehicle type'
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
