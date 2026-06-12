import { Button, Card, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Homelayout from "../../../layout/Homelayout";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const { Item } = Form

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams()
    const [forgotForm] = Form.useForm();
    const [rePasswordForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const tok = params.get("token");
        if (tok) {
            checkToken(tok)
        }
        else {
            setToken(null);
        }
    }, [params]);

    const checkToken = async (tok) => {
        try {
            await axios.post("/api/user/verify-token", {}, {
                headers: {
                    Authorization: `Bearer ${tok}`
                }

            });
            setToken(tok)
        } catch (err) {
            setToken(null);
        }
    }

    const onFinish = async (values) => {
        try {
            setLoading(true);

            const { data } = await axios.post(
                "/api/user/forgot-password",
                values
            );

            console.log(data);

            toast.success("Reset link sent successfully");

        } catch (err) {
            toast.error(
                err.response ? err.response.data.message : err.message
            );
        } finally {
            setLoading(false);
        }
    }
    const onchangePassword = async (values) => {
        try {
            if(values.password !== values.rePassword)
                return toast.warning("Password & re password not matched");
            setLoading(true)
            await axios.put("/api/user/change-password", values,
                {
                    headers: {
                        Authorization: `Bearer ${params.get("token")}`
                    }
                }
            );
            toast.success("Password updated successfully , please wait...");
            setTimeout(()=>{
                navigate("/")
            },3000)

        } catch (err) {
            toast.error(err.response ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Homelayout>
            <div className="flex">
                <div className="w-1/2 hidden md:flex items-center justify-center">
                    <img src="/exp-img.jpg" alt="Bank" className="w-4/5 object-contain" />
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-6 bg-white">
                    <Card className="w-full max-w-sm shadow-xl">
                        <h2 className="font-bold text-[#FF735C] text-2xl text-center mb-6">
                            {
                                token ?
                                    "Change Password"
                                    :
                                    "Forgot Password"
                            }
                        </h2>
                        {
                            token ?
                                <Form
                                    name="login-form"
                                    layout="vertical"
                                    onFinish={onchangePassword}
                                    form={rePasswordForm}
                                >
                                    <Item
                                        name="password"
                                        label="Password"
                                        rules={[{ required: true }]}
                                    >
                                        <Input.Password
                                            prefix={<LockOutlined />}
                                            placeholder="Enter your password "
                                        />
                                    </Item>
                                    <Item
                                        name="rePassword"
                                        label="Re Enter Password"
                                        rules={[{ required: true }]}
                                    >
                                        <Input.Password
                                            prefix={<LockOutlined />}
                                            placeholder="Enter your password "
                                        />
                                    </Item>
                                    <Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            block
                                            className="!bg-[#FF735C] !text-white !font-bold"
                                        >
                                            Change Password
                                        </Button>
                                    </Item>
                                </Form>
                                :
                                <Form
                                    name="login-form"
                                    layout="vertical"
                                    onFinish={onFinish}
                                    form={forgotForm}
                                >
                                    <Item
                                        name="email"
                                        label="Email"
                                        rules={[{ required: true }]}
                                    >
                                        <Input
                                            prefix={<UserOutlined />}
                                            placeholder="Enter email "
                                        />
                                    </Item>
                                    <Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            block
                                            className="!bg-[#FF735C] !text-white !font-bold"
                                        >
                                            Submit
                                        </Button>
                                    </Item>
                                </Form>
                        }


                        <div className="flex items-center justify-between">
                            <Link style={{ textDecoration: "underline" }}
                                to="/"
                                className="!text -[#FF735C] !font-bold"
                            >
                                Sign in
                            </Link>
                            <Link style={{ textDecoration: "underline" }}
                                to="/signup"
                                className="!text -[#FF735C] !font-bold"
                            >
                                Don't have an account?
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </Homelayout>
    )
}

export default ForgotPassword;