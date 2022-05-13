import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import languageJson from '../../config/language';
import { useSelector, useDispatch } from 'react-redux';
const columns = [
  {
    title: languageJson.image,
    dataIndex: 'image',
    key: languageJson.image,
    // render: (rowData) => (
    //   <img alt='Car' src={rowData.image} style={{ width: 50 }} />
    // ),
  },
  { title: languageJson.name, dataIndex: 'name', key: languageJson.name },
  {
    title: languageJson.rate_per_km,
    dataIndex: 'rate_per_kilometer',
    key: languageJson.rate_per_km,
  },
  {
    title: languageJson.rate_per_hour,
    dataIndex: 'rate_per_hour',
    key: languageJson.rate_per_hour,
  },
  {
    title: languageJson.min_fare,
    dataIndex: 'min_fare',
    key: languageJson.min_fare,
  },
  {
    title: languageJson.convenience_fee_percent,
    dataIndex: 'convenience_fees',
    key: languageJson.convenience_fee_percent,
  },
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
];
const Vehicles = () => {
  const cartypes = useSelector((state) => state.cartypes);
  const [carsdata, setcarsdata] = useState([]);
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
          <p style={{ margin: 0 }}>{record.description}</p>
        ),
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}
      dataSource={carsdata}
    />
  );
};
export default Vehicles;
