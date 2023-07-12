import React, { useEffect, useState } from 'react'
import TableComponent from '../../Components/TableComp'
import { getSingleUSer } from '../../Actions/fetchApiData'
import { formatApiData } from '../../utils/formatApiData'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Modal } from 'antd'






const ViewUser = () => {
    const {isLoading, isError, singleUser} = useSelector(({userReducer}) => userReducer);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
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
        profile_pic : singleUser?.profile_pic
      }
    ]

    // Image preview functionality

    const handleCancel = () => setPreviewOpen(false);
    const handleImagePreview = (profile_pic_url) => {
      if(!profile_pic_url) {
        return 
      }
      setPreviewOpen(true)
      setPreviewImage(profile_pic_url);
      setPreviewOpen(true);
    }

    const columns = [
      {
        title: 'Profile Pic',
        dataIndex: 'profile_pic',
        render: (profile_pic_url,record) => {
        return <span onClick = {() => handleImagePreview(profile_pic_url)} style = {{color : '#0088ff'}}>    
            {profile_pic_url ? <Avatar src={<img src={profile_pic_url} alt="avatar" />}></Avatar>:<Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{record?.name?.trim()[0].toUpperCase()}</Avatar>}
        </span>
        }
      },
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
    

    useEffect(() => {
      dispatch(getSingleUSer(`${process.env.REACT_APP_BASE_URL}/users/get/${user_id}`));
    },[]);

    // It handles the error if there is an network error or the server Error
    
    if(isError.message) {
      return <h3 style = {{textAlign : 'center', color : '#f95c5c', marginTop : '50px'}}>{isError.message}</h3>
    }

  return (
    <div style = {{margin : 'auto', marginTop : '60px', width : '80%'}}>
      <TableComponent isLoading = {isLoading} columns = {columns} formattedData ={formattedData} />
      <Modal open={previewOpen}  footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default ViewUser