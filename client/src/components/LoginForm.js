import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Input } from 'antd';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [form] = Form.useForm();
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      await form.validateFields();

      const response = await loginUser({
        variables: { ...userFormData },
      });

      console.log(response);
      Auth.login(response.data.login.token);
    } catch (err) {
      console.error(error);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form form={form} onFinish={handleFormSubmit}>
        {showAlert && (
          <Alert
            closable
            onClose={() => setShowAlert(false)}
            showIcon
            message="Something went wrong with your login credentials!"
            type="error"
          />
        )}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Email is required!',
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Password is required!',
            },
          ]}
        >
          <Input.Password
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!(userFormData.email && userFormData.password)}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;

