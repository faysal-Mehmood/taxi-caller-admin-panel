import React, { useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import languageJson from '../../config/language';
import { useSelector, useDispatch } from 'react-redux';
import { editVehicle } from '../../actions/cartypeactions';
import AddVehicle from './addVehicle';
// const columns = [
//   { title: 'Name', dataIndex: 'name', key: 'name' },
//   { title: 'Age', dataIndex: 'age', key: 'age' },
//   { title: 'Address', dataIndex: 'address', key: 'address' },
//   {
//     title: 'Action',
//     dataIndex: '',
//     key: 'x',
//     render: () => <a>Delete</a>,
//   },
// ];

// const data = [
//   {
//     key: 1,
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     description:
//       'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//   },
//   {
//     key: 2,
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     description:
//       'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
//   },
//   {
//     key: 3,
//     name: 'Not Expandable',
//     age: 29,
//     address: 'Jiangsu No. 1 Lake Park',
//     description: 'This not expandable',
//   },
//   {
//     key: 4,
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     description:
//       'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
//   },
// ];

const Vehicles = ({ isModalVisible, setIsModalVisible, seteditKey }) => {
  const cartypes = useSelector((state) => state.cartypes);
  const [carsdata, setcarsdata] = useState([]);
  const dispatch = useDispatch();
  const handleDelete = (key) => {
    // setcarsdata(carsdata?.filter((car) => car.key !== key));
    dispatch(editVehicle(carsdata?.filter((car) => car.key !== key)));
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
      // filters: [
      //   {
      //     text: 'London',
      //     value: 'London',
      //   },
      //   {
      //     text: 'New York',
      //     value: 'New York',
      //   },
      // ],
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
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
      setcarsdata(cartypes.cars);
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
