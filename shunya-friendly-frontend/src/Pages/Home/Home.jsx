import React, { useEffect, useState } from 'react'
import { Button, message } from 'antd';
import { UserAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import style from './Home.module.css'
import TableComponent from '../../Components/TableComp';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatApiData } from '../../utils/formatApiData';
import { getData } from '../../Actions/fetchApiData';
import {Popconfirm} from 'antd';
import { deleteUser } from '../../Actions/fetchApiData';

const Home = () => {
  const dispatch = useDispatch();
  const {isError,isLoading,users} = useSelector(({userReducer}) => userReducer);
  const {isLoading : deleteLoading} = useSelector(({userReducer}) => userReducer.deleteData);
  
  //shows loader to only that button whose data is going to be deleted
  const [deletingUserId, setDeletingUserId] = useState(null);

  // This Formats original Users data with the Keys and values that Ant D Table requires and returns formatted Data
  const formattedData = formatApiData(users);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}/users/get`;
    dispatch(getData(url));
  },[]);

  const handleDelete = (user_id) => {
    setDeletingUserId(user_id)
    const url = `${process.env.REACT_APP_BASE_URL}/users/delete/${user_id}`;
    dispatch(deleteUser(url))
    .then((res) => {
      console.log(res);
      message.success('User has been Deleted Successfully');
    })
    .catch((error) => {
      console.log(error);
      message.error(error.message);
    })
      console.log('hii')
  }

  console.log('render')

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'user_id',
      render: (text) => {
      return <span style = {{color : '#0088ff'}}>{text}</span>
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'View',
      dataIndex: 'button1',
      render : (text, record) => {
          return <Link to = {`/view-user/${record.user_id}`} >
                      <Button>{text}</Button>
                </Link>
      }
    },
    {
      title: 'Edit',
      dataIndex: 'button2',
      render : (text, record) => {
          return <Link to = '/create-user?from=edit' state = {record}>
              <Button icon = {<EditOutlined />}>{text}</Button>
          </Link>
      }
    },
    {
      title: 'Delete',
      dataIndex: 'button3',
      render : (text,record) => {

          const deleteRow  = record.user_id === deletingUserId;

          return <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this User?"
          onConfirm={() => handleDelete(record.user_id)}
          okText="Yes"
          cancelText="No"
        > 
          <Button loading = {deleteRow ? deleteLoading : false} icon = {<DeleteOutlined />} danger = {true}>{text}</Button>
        </Popconfirm>
      }
    },
  ];



  // It handles the error if there is an network error or the server Error
  if(isError.message === 'Network Error') {
    return <h3 style = {{textAlign : 'center', color : '#f95c5c', marginTop : '50px'}}>Please Check Your Internet Connection</h3>
  }else if(isError.message === 'Server Error') {
    return <h3 style = {{textAlign : 'center', color : '#f95c5c', marginTop : '50px'}}>Unable to connect to the Server Please Contact the Admin</h3>
  }

  return (
    <>
        <div className = {style['add-user-container']}>
            <Link to = '/create-user?from=addUser'><Button type = 'primary' icon = {<UserAddOutlined />}>Add Users</Button></Link>
        </div>

        <div className = {style.tablecontainer}>
            <TableComponent isLoading = {isLoading} columns = {columns} formattedData = {formattedData}/>
        </div>
    </>
  )
}

export default Home
