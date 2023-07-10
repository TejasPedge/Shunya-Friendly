import React from 'react'
import {Table} from 'antd';
import { Spin } from 'antd';
import {Empty} from 'antd';

const TableComponent = ({isLoading,columns,formattedData}) => {


    if(isLoading) {
      return <div style = {{display : 'flex', justifyContent : 'center', marginTop : '10px'}}><Spin/></div>
    }

    if(formattedData.length === 0) {
      return <div style = {{display : 'flex', justifyContent : 'center', marginTop : '100px'}}>
        <Empty description={
            <span>
              No Users Added
            </span>
          }/>
      </div>
    }

    return <Table columns={columns} dataSource={formattedData} />;

}

export default TableComponent; 