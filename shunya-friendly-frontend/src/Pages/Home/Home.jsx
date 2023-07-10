import React, { useEffect } from 'react'
import { Button } from 'antd';
import { UserAddOutlined, EditOutlined } from '@ant-design/icons';
import style from './Home.module.css'
import TableComponent from '../../Components/TableComp';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatApiData } from '../../utils/formatApiData';
import { getData } from '../../Actions/fetchApiData';




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
    render : (text) => {
        return <Button icon = {<EditOutlined />}>{text}</Button>
    }
  },
  {
    title: 'Delete',
    dataIndex: 'button3',
    render : (text) => {
        return <Button danger = {true}>{text}</Button>
    }
  },
];










const Home = () => {
  const dispatch = useDispatch();
  const {isError,isLoading,users} = useSelector(({userReducer}) => userReducer);

  // This Formats original Users data with the Keys and values that Ant D Table requires and returns formatted Data
  const formattedData = formatApiData(users);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}/users/get`;
    dispatch(getData(url));
  },[]);



  // It handles the error if there is an network error or the server Error
  if(isError.message === 'Network Error') {
    return <h3 style = {{textAlign : 'center', color : '#f95c5c', marginTop : '50px'}}>Please Check Your Internet Connection</h3>
  }else if(isError.message === 'Server Error') {
    return <h3 style = {{textAlign : 'center', color : '#f95c5c', marginTop : '50px'}}>Unable to connect to the Server Please Contact the Admin</h3>
  }

  return (
    <>
        <div className = {style['add-user-container']}>
            <Link to = '/create-user'><Button type = 'primary' icon = {<UserAddOutlined />}>Add Users</Button></Link>
        </div>

        <div className = {style.tablecontainer}>
            <TableComponent isLoading = {isLoading} columns = {columns} formattedData = {formattedData}/>
        </div>
    </>
  )
}

export default Home
