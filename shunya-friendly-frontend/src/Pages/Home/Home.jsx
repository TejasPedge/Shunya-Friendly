import React from 'react'
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import style from './Home.module.css'
import TableComponent from '../../Components/TableComp';

const Home = () => {
  return (
    <>
        <div className = {style['add-user-container']}>
            <Button type = 'primary' icon = {<UserAddOutlined />}>Add Users</Button>
        </div>

        <div className = {style.tablecontainer}>
            <TableComponent/>
        </div>
    </>
  )
}

export default Home