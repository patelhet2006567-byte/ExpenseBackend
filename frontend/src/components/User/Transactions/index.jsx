import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Popconfirm, Select, Table } from "antd";
import Item from "antd/es/list/Item";
import { useState } from "react";
import { toast } from "react-toastify";


const Transactions = () => {
    const [transactioForm] = Form.useForm();

    const [edit, setEdit] = useState(null);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            title: "Transaction Type",
            dataIndex: "transactionType",
            key: "transactionType",
            className: "capitalize"
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            className: "capitalize"
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            className: "capitalize"
        },
        {
            title: "Payment Method",
            dataIndex: "paymentmethod",
            key: "paymentMethod",
            className: "capitalize"
        },
        {
            title: "Notes",
            dataIndex: "notes",
            key: "notes",
            className: "capitalize"
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {

            title: "Action",
            key: "action",
            fixed: "right",
            render: (_, obj) => (
                <div className="flex gap-1">
                    <Popconfirm
                        title="Are you sure ?"
                        description="Once you update , you can also re-update ! "
                        onCancel={() => toast.info("No Changes occur")}
                    >
                        <Button
                            type="text"
                            className="!bg-green-100 !text-green-500"
                            icon={<EditOutlined />}
                        ></Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Are you sure ?"
                        description="Once you deleted , you can not re-store ! "
                        onCancel={() => toast.info("Your data is safe !")}
                    >
                        <Button
                            type="text"
                            className="!bg-rose-100 !text-rose-500"
                            icon={<DeleteOutlined />}
                        ></Button>
                    </Popconfirm>
                </div>
            ),
        }
    ];
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
                            <Button
                                type="text"
                                className="!font-bold !bg-blue-500 !text-white"
                                onClick={() => { setModal(true) }}
                            >
                                Add new transaction
                            </Button>
                        </div>
                    }
                >

                </Card>
                <Table
                    columns={columns}
                    dataSource={[{}, {}]}
                    scroll={{ x: "max-contant " }}
                />
            </div>
            <Modal
                open={modal}
                onCancel={() => setModal(false)}
                title="Add new transaction"
                footer={null}
            >
                <Form
                    layout="vertical"
                    form={transactioForm}
                >
                    <div className="grid md:grid-cols-2 gap-x-3">
                        <Item
                            label="Transaction"
                            name="transactionType"
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder="Transaction Type"
                                options={[
                                    { label: "CR", value: "cr" },
                                    { label: "DR", value: "dr" }
                                ]}
                            />

                        </Item>
                        <Item
                            label="Amount"
                            name="amount"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Enter Amount" type="number" />
                        </Item>
                        <Item
                            label="Title"
                            name="title"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Enter Title" />
                        </Item>
                        <Item
                            label="Payment Method"
                            name="paymentMethod"
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder="Payment Method"
                                options={[
                                    { label: "Cash", value: "cash" },
                                    { label: "Online", value: "online" }
                                ]}
                            />

                        </Item>
                    </div>
                    <Item
                        label="Notes"
                        name="notes"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea placeholder="potato , tomato , etc" />
                    </Item>
                    <Item 
                    className="flex justify-end items-center"
                    >
                        <Button 
                        loading={loading}
                        type="text"
                        htmlType="submit"
                        className="!font-semibold !text-white !bg-blue-500">
                            Submit
                        </Button>
                    </Item>
                </Form>
            </Modal>
        </div>
    )
}
export default Transactions;