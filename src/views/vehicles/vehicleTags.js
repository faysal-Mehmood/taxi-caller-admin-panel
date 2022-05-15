import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from 'antd';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { editVehicleTags } from '../../actions/cartypeactions';
const { Option } = Select;

const VehicleTags = () => {
  const dispatch = useDispatch();
  const cartypes = useSelector((state) => state.cartypes);
  const [vehicleTagName, setvehicleTagName] = useState('');
  const [newVehicleTag, setnewVehicleTag] = useState([]);
  const [vehicleTags, setvehicleTags] = useState([]);
  useEffect(() => {
    if (cartypes?.vehicleTags) {
      setvehicleTags(cartypes?.vehicleTags);
      setnewVehicleTag(cartypes?.vehicleTags);
    }
  }, [cartypes?.vehicleTags]);
  console.log('tags', cartypes);
  return (
    <div className='vehicle-type-container'>
      <div className='vehicle-type-area'>
        {vehicleTags?.length > 0 ? (
          vehicleTags?.map((vehicle, counter) => {
            return (
              <div className='vehicle-type-content' key={counter}>
                <Input
                  className='vehicle-type'
                  name={vehicle.tagName}
                  value={vehicle.tagName}
                  readOnly
                />
                <div className='vehicle-enable-checkbox'>
                  <input
                    type='checkbox'
                    name={vehicle.tagName}
                    checked={vehicle.enabled}
                    onChange={(e) => {
                      const vehicleTagIndex = vehicleTags?.filter(
                        (vehicle1) => vehicle1.id === vehicle.id
                      );

                      if (e.target.checked) {
                        vehicleTagIndex && (vehicleTagIndex[0].enabled = true);
                      } else {
                        vehicleTagIndex && (vehicleTagIndex[0].enabled = false);
                      }
                      setnewVehicleTag([...newVehicleTag, vehicleTagIndex[0]]);
                      dispatch(editVehicleTags(newVehicleTag));
                    }}
                  />
                  <label>Enabled</label>
                  <label
                    className='del-icon'
                    onClick={(e) => {
                      const filteredTags = vehicleTags?.filter(
                        (vehicle1) => vehicle1.id !== vehicle.id
                      );
                      dispatch(editVehicleTags(filteredTags));
                    }}
                  >
                    x
                  </label>
                </div>
              </div>
            );
          })
        ) : (
          <p>No vehicle tags Available</p>
        )}
        {/* {cartypes?.error?.flag && <p>{cartypes?.error?.msg}</p>} */}
      </div>
      <Input
        style={{ marginBottom: '10px' }}
        placeholder='Select a new tag'
        value={vehicleTagName}
        onChange={(e) => {
          setvehicleTagName(e.target.value);
        }}
        onBlur={(e) => {
          if (vehicleTagName) {
            setnewVehicleTag([
              ...newVehicleTag,
              { id: uuid(), tagName: vehicleTagName, enabled: true },
            ]);
          }
        }}
      />

      <Button
        type='primary'
        className=''
        onClick={() => {
          if (newVehicleTag) {
            dispatch(editVehicleTags(newVehicleTag));
            setvehicleTagName('');
          }
        }}
      >
        Add New Tag
      </Button>
    </div>
  );
};

export default VehicleTags;
