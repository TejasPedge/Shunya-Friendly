import React, { useEffect } from 'react'
import TableComponent from '../../Components/TableComp'
import { getSingleUSer } from '../../Actions/fetchApiData'
import { formatApiData } from '../../utils/formatApiData'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';




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
    title: 'Email',
    dataIndex: 'email',
    render: (text) => {
      return <span style = {{color : '#22a55f'}}>{text}</span>
      }
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
  }
];


const ViewUser = () => {
    const {isLoading, isError, singleUser} = useSelector(({userReducer}) => userReducer);
    const dispatch = useDispatch();
    const {user_id} = useParams();
    console.log(singleUser,isError,isLoading)

    const formattedData = [
      {
        key : user_id,
        user_id : singleUser?._id,
        name : singleUser?.name,
        email : singleUser?.email,
        phone : singleUser?.phone,
      }
    ]

    useEffect(() => {
      dispatch(getSingleUSer(`${process.env.REACT_APP_BASE_URL}/users/get/${user_id}`));
    },[]);

    // It handles the error if there is an network error or the server Error
    if(isError.message === 'Network Error') {
      return <h3 style = {{textAlign : 'center', color : '#f95c5c', marginTop : '50px'}}>Please Check Your Internet Connection</h3>
    }else if(isError.message === 'Server Error') {
      return <h3 style = {{textAlign : 'center', color : '#f95c5c', marginTop : '50px'}}>Unable to connect to the Server Please Contact the Admin</h3>
    }

  return (
    <div style = {{margin : 'auto', marginTop : '60px', width : '80%'}}>
      {singleUser && <TableComponent isLoading = {isLoading} columns = {columns} formattedData ={formattedData} />}
    </div>
  )
}

export default ViewUser