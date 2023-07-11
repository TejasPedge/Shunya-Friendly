import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { createUsers } from '../Actions/fetchApiData';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { updateUser } from '../Actions/fetchApiData';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: 'Please enter a valid email!',
    number: 'Please enter a valid number!',
  },
};
/* eslint-enable no-template-curly-in-string */


const validatePhoneNumber = (_, value) => {

    if (!value) {
        return Promise.reject(new Error('Phone number is required!'));
    }

  if (value && value.length !== 10) {
    return Promise.reject(new Error('Please enter a valid phone number!'));
  }
  
  return Promise.resolve();
};


// Form Component
const FormComp = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const {isLoading,isError} = useSelector(({userReducer}) => userReducer.postData)
    const dispatch = useDispatch();

    const {state} = useLocation();

    console.log(state);

    const [searchParams] = useSearchParams();

    const cameFrom = searchParams.get('from')

    const populateValues = state !== null ? 
    {
        name : state.name, 
        email : state.email, 
        phone : state.phone
    } : null;

    //createUSers function Makes a post request to the backend
    const onFinish =  (values) => {

        console.log(values.user);

        if (cameFrom !== 'edit') {

            const url = `${process.env.REACT_APP_BASE_URL}/users/post`
            dispatch(createUsers(url, values.user ))
            .then((response) => {
                console.log(response);
                const success = () => {
                    messageApi.open({
                      type: 'success',
                      content:'User created successfully',
                    });
                  };
                // shows the success alert
                success();
                console.log('success');
            })
            .catch((error) => {
                const errorToast = () => {
                    messageApi.open({
                        type: 'error',
                        content: error.message,
                    });
                };

                errorToast();
                console.dir(error.message);
            })
        } else {
            const url = `${process.env.REACT_APP_BASE_URL}/users/put/${state.user_id}`
            dispatch(updateUser(url,values.user))
            .then((response) => {
                console.log(response);
                const success = () => {
                    messageApi.open({
                      type: 'success',
                      content:'User Updated Successfully',
                    });
                  };
                // shows the success alert
                success();
                console.log('success');
            })
            .catch((error) => {
                const errorToast = () => {
                    messageApi.open({
                        type: 'error',
                        content: error.message,
                    });
                };
                errorToast();
                console.dir(error.message);
            })
        }
    };

console.log('rendered',isError);

  return <>

            {contextHolder}
            
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 500, border: '2px solid blue', backgroundColor: '#eff4fd', borderRadius: '10px', margin: 'auto', padding: '40px 80px 20px 0px', marginTop: '50px' }}
                validateMessages={validateMessages}
                initialValues = {{user : populateValues}}
            >
                <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                <Input/>
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input />
                </Form.Item>
                <Form.Item name={['user', 'phone']} label="Phone" rules={[{ required: true, validator: validatePhoneNumber }]}>
                <Input type = 'number' />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button loading = {isLoading} type="primary" htmlType="submit">
                    {cameFrom === 'addUser' ? 'Create User' : 'Update User'}
                </Button>
                </Form.Item>
            </Form>
    </>
};

export default FormComp;
