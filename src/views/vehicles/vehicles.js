import React, { useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import languageJson from '../../config/language';
import { useSelector, useDispatch } from 'react-redux';
import { editVehicle } from '../../actions/cartypeactions';
import AddVehicle from './addVehicle';
const Vehicles = ({ isModalVisible, setIsModalVisible, seteditKey }) => {
  const cartypes = useSelector((state) => state.cartypes);
  const [carsdata, setcarsdata] = useState([]);
  const dispatch = useDispatch();
  const handleDelete = (key) => {
    var deleted = carsdata?.filter((car) => car.key === key);
    deleted[0].isdeleted = true;
    console.log('del', [...carsdata, deleted[0]]);
    // dispatch(editVehicle(carsdata));
  };
  const columns = [
    {
      title: languageJson.image,
      dataIndex: 'image',
      key: languageJson.image,
      render: (_, record) => (
        <img alt='Car' src={record.image} style={{ width: 50 }} />
      ),
    },
    {
      title: languageJson.name,
      dataIndex: 'name',
      key: languageJson.name,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: languageJson.rate_per_km,
      dataIndex: 'rate_per_kilometer',
      key: languageJson.rate_per_km,
      sorter: (a, b) => a.rate_per_kilometer - b.rate_per_kilometer,
    },
    {
      title: languageJson.rate_per_hour,
      dataIndex: 'rate_per_hour',
      key: languageJson.rate_per_hour,
      sorter: (a, b) => a.rate_per_hour - b.rate_per_hour,
    },
    {
      title: languageJson.min_fare,
      dataIndex: 'min_fare',
      key: languageJson.min_fare,
      sorter: (a, b) => a.min_fare - b.min_fare,
    },
    {
      title: languageJson.convenience_fee_percent,
      dataIndex: 'convenience_fees',
      key: languageJson.convenience_fee_percent,
      sorter: (a, b) => a.convenience_fees - b.convenience_fees,
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'actions',
      render: (_, record) =>
        carsdata?.length >= 1 ? (
          <>
            <Popconfirm
              title='Sure to delete?'
              onConfirm={() => handleDelete(record.key)}
            >
              <a style={{ marginRight: '10px' }}>Delete</a>
            </Popconfirm>
            <a
              onClick={() => {
                seteditKey(record.key);
                setIsModalVisible(true);
              }}
            >
              edit
            </a>
          </>
        ) : null,
    },
  ];
  useEffect(() => {
    if (cartypes.cars) {
      setcarsdata(cartypes?.cars.filter((car) => car.isdeleted === false));
    }
  }, [cartypes.cars]);
  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <div className='expanded-row-container'>
            <h3>General Information</h3>
            <div className='expanded-col-content'>
              <div className='expanded-col'>
                <div className='col'>
                  <label>Number of Seats</label>
                  <p>{record.personSeats}</p>
                </div>
                <div className='col'>
                  <label>Business Class seats</label>
                  <p>{record.busiClass}</p>
                </div>
                <div className='col'>
                  <label>Wheel Chair Allowed</label>
                  <p>{record.wheelChair}</p>
                </div>
              </div>
              <div className='expanded-col'>
                <div className='col'>
                  <label>Vehicle type</label>
                  <p>{record.vehicleType}</p>
                </div>
                <div className='col'>
                  <label>Vehicle tag (If any:)</label>
                  <p>{record.vehicleTags}</p>
                </div>
              </div>
            </div>
          </div>
        ),
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}
      dataSource={carsdata}
    />
  );
};
export default Vehicles;
