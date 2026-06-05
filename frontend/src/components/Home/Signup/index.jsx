import { Button, Card, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Homelayout from "../../../layout/Homelayout";
import axios from "axios";
import { useState } from "react";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const { Item } = Form

const Signup = () => {
    const [formData, setformData] = useState(null);
    const [otp, setOtp] = useState(null);
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        try {
            setLoading(true)
            const { data } = await axios.post("/api/user/send-mail", values)
            setOtp(data.otp);
            setformData(values)
        } catch (error) {
            setOtp(null);
            setformData(null);

        } finally {
            setLoading(false);
        }
    }
    const onSignup = async (values) => {
        try {
            if(Number(values.otp)!==Number(otp))
                return alert("OTP not match")
            // setLoading(true)
            // const { data } = await axios.post("/api/user/send-mail", values)
            // setOtp(data.otp);
            // setformData(values)
        } catch (error) {
            setOtp(null);
            setformData(null);

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
                            Track your Expense
                        </h2>
                        {
                            otp ?
                                <Form
                                    name="login-form"
                                    layout="vertical"
                                    onFinish={onSignup}
                                >
                                    <Item
                                        name="otp"
                                        label="OTP"
                                        rules={[{ required: true }]}
                                    >
                                        <Input.OTP
                                            prefix={<UserOutlined />}
                                            placeholder="Enter your fullname "
                                        />
                                    </Item>
                                    <Item>
                                        <Button
                                            loading={loading}
                                            type="text"
                                            htmlType="submit"
                                            block
                                            className="!bg-[#FF735C] !text-white !font-bold"
                                        >
                                            verify Now
                                        </Button>
                                    </Item>
                                </Form>
                                :
                                <Form
                                    name="login-form"
                                    layout="vertical"
                                    onFinish={onFinish}
                                >
                                    <Item
                                        name="fullname"
                                        label="Fullname"
                                        rules={[{ required: true }]}
                                    >
                                        <Input
                                            prefix={<UserOutlined />}
                                            placeholder="Enter your fullname "
                                        />
                                    </Item>
                                    <Item
                                        name="mobile"
                                        label="Mobile"
                                        rules={[{ required: true }]}
                                    >
                                        <Input
                                            prefix={<UserOutlined />}
                                            placeholder="Enter your mobile "
                                        />
                                    </Item>
                                    <Item
                                        name="email"
                                        label="Username"
                                        rules={[{ required: true }]}
                                    >
                                        <Input
                                            prefix={<UserOutlined />}
                                            placeholder="Enter your username "
                                        />
                                    </Item>
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
                                    <Item>
                                        <Button
                                            loading={loading}
                                            type="text"
                                            htmlType="submit"
                                            block
                                            className="!bg-[#FF735C] !text-white !font-bold"
                                        >
                                            Signup
                                        </Button>
                                    </Item>
                                </Form>
                        }
                        <div className="flex items-center justify-between">
                            <div> </div>
                            <Link style={{ textDecoration: "underline" }}
                                to="/"
                                className="!text -[#FF735C] !font-bold"
                            >
                                Already have an account
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </Homelayout>
    )
}

export default Signup;