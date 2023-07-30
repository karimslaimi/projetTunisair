import { useState} from 'react';
import { useDispatch} from "react-redux";
import {Button, Form, Input, Alert} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';

import { useNavigate  } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "Components/shared-components/Loading";
import {useForm} from "antd/es/form/Form";
import authService from "Services/AuthService";
import {login} from "Redux/Slices/AuthSlice";

const LoginForm = props => {


    const {
        showForgetPassword,
        onForgetPasswordClick,
        extra,
        showMessage,
        message
    } = props


    let [form] = useForm();
    let hidden = true;
    let [isLoading, setLoading]=useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();



    const onLogin = (data) => {
        setLoading(true);
        authService.signIn(data.userName,data.password).then((result)=>{
            if (result){
                dispatch(login(result));
                setLoading(false);
                navigate('/');
            }else{
                setLoading(false);
                alert(result.data.message);

            }
        }).catch((e)=>{
            setLoading(false);
            console.log(e.response.data.message);
            alert(e.response.data.message);
        });

    }



    return (
        <>
            <Loading hidden={hidden}/>
            <motion.div
                initial={{ opacity: 0, marginBottom: 0 }}
                animate={{
                    opacity: showMessage ? 1 : 0,
                    marginBottom: showMessage ? 20 : 0
                }}>
                <Alert type="error" showIcon message={message}></Alert>
            </motion.div>
            <Form
                form={form}
                layout="vertical"
                name="login-form"
                onFinish={onLogin}
            >
                <Form.Item
                    name="userName"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username',
                        }
                    ]}>
                    <Input prefix={<UserOutlined className="text-primary" />} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label={
                        <div className={`${showForgetPassword? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
                            <span>Password</span>
                            {
                                showForgetPassword &&
                                <span
                                    onClick={() => onForgetPasswordClick}
                                    className="cursor-pointer font-size-sm font-weight-normal text-muted"
                                >
									Forget Password?
								</span>
                            }
                        </div>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password',
                        }
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="text-primary" />} autoComplete="on" placeholder="Password"/>
                </Form.Item>
                <Form.Item>
                    { isLoading ? <div className="loading"><span>Loading...</span></div> :

                    <Button type="primary" htmlType="submit" block  loading={isLoading}>
                        Sign In
                    </Button>
                        }
                </Form.Item>

                { extra }
            </Form>
        </>
    )
}

LoginForm.propTypes = {
    otherSignIn: PropTypes.bool,
    showForgetPassword: PropTypes.bool,
    extra: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
};

LoginForm.defaultProps = {
    otherSignIn: true,
    showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
    const {loading, message, showMessage, token, redirect} = auth;
    return {loading, message, showMessage, token, redirect}
}



export default LoginForm
