import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, SearchOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Form, Input, Modal, Popconfirm, Select, Table } from "antd";
import useSWR, { mutate } from "swr"
import { useState } from "react";
import { toast } from "react-toastify";
import http from "../../../utils/http"
import fetcher from "../../../utils/fetcher";
import { data } from "react-router-dom";
import { formatCounter } from "antd/es/statistic/utils";
import { formatDate } from "../../../utils/date";


const Users = () => {
    const [transactionForm] = Form.useForm();
    const [edit, setEdit] = useState(null);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            className: "capitalize"
        },
        {
            title: "Fullname",
            dataIndex: "fullname",
            key: "fullname",
            className: "capitalize"
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
            className: "capitalize"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            className: "capitalize"
        },
        // {
        //     title: "Payment Method",
        //     dataIndex: "paymentmethod",
        //     key: "paymentMethod",
        //     className: "capitalize"
        // },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => formatDate(date)
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            className: "capitalize",
            render: (status, obj) => (
                status ?
                    <Button
                        shape="circle"
                        icon={<EditOutlined />}
                        className="!bg-green-500 !text-white"
                        onClick={() => onStatus(obj)}
                        loading={loading}
                    />
                    :
                    <Button
                        shape="circle"
                        icon={<EyeInvisibleOutlined />}
                        className="!bg-rose-400 !text-white"
                        onClick={() => onStatus(obj)}
                        loading={loading}
                    />
            )
        },

    ];

    const { data: users, error, isLoading } = useSWR(
        "/api/user/get",
        fetcher

    )

    const onStatus = async (obj) => {

        try {
            setLoading(true);
            await http.put(`/api/user/status/${obj._id}`, { status: !obj.status });
            toast.success("Status updated successfully !");
            mutate("/api/user/get");
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="grid">
                <Card
                    title="Transaction List"
                    style={{ overflowX: "auto" }}
                    extra={
                        <div className="mt-2 md:mt-0 flex flex-col md:flex-row gap-3">
                            <Input placeholder="Search by all"
                                prefix={<SearchOutlined />}
                            />
                        </div>
                    }
                >

                </Card>
                <Table
                    columns={columns}
                    dataSource={users}
                    scroll={{ x: "max-contant " }}
                    loading={isLoading}
                />
            </div>

        </div>
    )
}
export default Users;