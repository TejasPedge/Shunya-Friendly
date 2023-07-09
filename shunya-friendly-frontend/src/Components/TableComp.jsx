import React from 'react'
import {Button, Table, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useSelector,useDispatch } from 'react-redux';
import { requestMade } from '../Redux/userreducer';





const data = [
  {
    key : 1,
    id : 1,
    name: 'John Brown',
    button1 : 'View',
    button2 : 'Edit',
    button3 : 'Delete',
  },
  {
    key : 2,
    id: '2',
    name: 'Jim Green',
    button1 : 'View',
    button2 : 'Edit',
    button3 : 'Delete',
  },
  {
    key : 3,
    id: '3',
    name: 'Joe Black',
    button1 : 'View',
    button2 : 'Edit',
    button3 : 'Delete',
  },
];

const TableComponent = () => {

    const dispatch = useDispatch();

    const state = useSelector(state => state);

    console.log('dsfsdfdsf',state);

    const handleClick = () => {
        console.log('hii');
        
    }

    const columns = [
        {
          title: 'User ID',
          dataIndex: 'id',
          render: (text, record) => {
              console.log(record)
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
          render : (text) => {
              return <Button onClick = {handleClick}>{text}</Button>
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




    
    return <Table columns={columns} dataSource={data} />;

}

export default TableComponent; 