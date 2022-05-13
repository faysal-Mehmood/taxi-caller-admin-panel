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

  function onChange(value) {
    console.log(`selected ${value}`);
    setvehicleTagName(value);
  }
  function onSearch(val) {
    console.log('search:', val);
  }
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
        {vehicleTags?.map((vehicle, counter) => {
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
              </div>
            </div>
          );
        })}
        {/* {cartypes?.error?.flag && <p>{cartypes?.error?.msg}</p>} */}
      </div>
      <Select
        style={{ marginRight: '10px' }}
        placeholder='Select a New Tag'
        optionFilterProp='children'
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onBlur={(e) => {
          if (vehicleTagName) {
            setnewVehicleTag([
              ...newVehicleTag,
              { id: uuid(), tagName: vehicleTagName, enabled: true },
            ]);
            setvehicleTagName('');
          }
        }}
      >
        <Option value='Comfortable'>Comfortable</Option>
        <Option value='Pet-friendly'>Pet friendly</Option>
        <Option value='No-smoking'>No Smoking</Option>
      </Select>
      <Button
        type='primary'
        className=''
        onClick={() => {
          if (newVehicleTag) {
            dispatch(editVehicleTags(newVehicleTag));
          }
        }}
      >
        Add New Tag
      </Button>
    </div>
  );
};

export default VehicleTags;
