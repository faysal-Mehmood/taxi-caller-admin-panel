import React from 'react';
import { Table, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { editUser, deleteUser } from '../../../actions/usersactions';
import languageJson from '../../../config/language';
const Usertable = ({ filterData, cars, data }) => {
  const dispatch = useDispatch();
  const handleDelete = (key) => {
    dispatch(deleteUser(data?.filter((user) => user.id !== key.toString())));
    console.log('data', data);
  };
  const columns = [
    {
      title: languageJson.first_name,
      dataIndex: 'firstName',
      key: languageJson.first_name,
    },
    {
      title: languageJson.last_name,
      dataIndex: 'lastName',
      key: languageJson.last_name,
    },
    {
      title: languageJson.user_type,
      dataIndex: 'usertype',
      key: languageJson.user_type,
    },
    {
      title: languageJson.car_type,
      dataIndex: 'carType',
      key: languageJson.car_type,
      lookup: cars,
    },
    {
      title: languageJson.profile_image,
      dataIndex: 'profile_image',
      render: (_, record) =>
        record.profile_image ? (
          <img
            alt='Profile'
            src={record.profile_image}
            style={{ width: 50, borderRadius: '50%' }}
          />
        ) : null,
      key: languageJson.profile_image,
    },

    {
      title: languageJson.Cnic_Front_image,
      dataIndex: 'cnicFront',
      render: (_, record) =>
        record.cnicFront ? (
          <img alt='cnicFront' src={record.cnicFront} style={{ width: 100 }} />
        ) : null,
      key: languageJson.Cnic_Front_image,
    },
    {
      title: languageJson.Cnic_Back_image,
      dataIndex: 'cnicBackImage',
      render: (_, record) =>
        record.cnicBackImage ? (
          <img
            alt='cnicBackImage'
            src={record.cnicBackImage}
            style={{ width: 100 }}
          />
        ) : null,
      key: languageJson.Cnic_Back_image,
    },
    {
      title: languageJson.lisence_image,
      dataIndex: 'licenseImage',
      render: (_, record) =>
        record.licenseImage ? (
          <img alt='License' src={record.licenseImage} style={{ width: 100 }} />
        ) : null,
      key: languageJson.lisence_image,
    },
    {
      title: languageJson.Papers,
      dataIndex: 'papers',
      render: (_, record) =>
        record.papers ? (
          <img alt='License' src={record.papers} style={{ width: 100 }} />
        ) : null,
      key: languageJson.Papers,
    },
    {
      title: languageJson.Selfie,
      dataIndex: 'selfie',
      render: (_, record) =>
        record.selfie ? (
          <img alt='selfie' src={record.selfie} style={{ width: 100 }} />
        ) : null,
      key: languageJson.Selfie,
    },
    {
      title: languageJson.wallet_balance,
      dataIndex: 'walletBalance',
      key: languageJson.wallet_balance,
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'actions',
      render: (_, record) =>
        filterData?.length >= 1 ? (
          <>
            <Popconfirm
              title='Sure to delete?'
              onConfirm={() => handleDelete(record.id)}
            >
              <a style={{ marginRight: '10px' }}>Delete</a>
            </Popconfirm>
            <a
              onClick={() => {
                alert(record.id);
              }}
            >
              edit
            </a>
          </>
        ) : null,
    },
  ];
  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      expandable={{
        expandedRowRender: (record) => (
          <div className='expanded-row-container'>
            <h3>General Information</h3>
            <div className='expanded-col-content'>
              <div className='expanded-col'>
                <div className='col'>
                  <label>{languageJson.mobile}:</label>
                  <p>{record.mobile}</p>
                </div>
                <div className='col'>
                  <label>{languageJson.vehicle_model}:</label>
                  <p>{record.vehicleModel}</p>
                </div>
                <div className='col'>
                  <label>{languageJson.vehicle_no}:</label>
                  <p>{record.vehicleNumber}</p>
                </div>
              </div>
              <div className='expanded-col'>
                <div className='col'>
                  <label>{languageJson.email}:</label>
                  <p>{record.email}</p>
                </div>
                <div className='col'>
                  <label>{languageJson.account_approve}:</label>
                  <p>{record.approved ? 'Approved' : 'Not Approved'}</p>
                </div>
                <div className='col'>
                  <label>{languageJson.driver_active}:</label>
                  <p>{record.driverActiveStatus ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className='expanded-col'>
                <div className='col'>
                  <label>{languageJson.pending_commition}:</label>
                  <p>{record.pendingCommition}</p>
                </div>
                <div className='col'>
                  <label>{languageJson.refferal_id}:</label>
                  <p>{record.refferalId}</p>
                </div>
                <div className='col'>
                  <label>{languageJson.signup_via_refferal}:</label>
                  <p>{record.signupViaReferral}</p>
                </div>
              </div>
            </div>
          </div>
        ),
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}
      dataSource={filterData}
    />
  );
};

export default Usertable;
