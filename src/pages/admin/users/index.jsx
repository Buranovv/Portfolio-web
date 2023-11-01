import { Fragment, useState } from "react";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
} from "antd";
import {
  UserAddOutlined,
  SaveOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { LIMIT } from "../../../constants";

import { getUserPhoto } from "../../../utils";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/queries/user";

const UsersPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data: { users, total } = { users: [], total: 0 },
    isFetching,
    refetch,
  } = useGetUsersQuery({ page, search });

  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [getUser] = useGetUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const showModal = async () => {
    setIsModalOpen(true);
    setSelected(null);
    form.resetFields();
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    setPage(1);
  };

  const handleOk = async () => {
    try {
      setIsModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await addUser(values).unwrap();
      } else {
        await updateUser({ body: values, id: selected }).unwrap();
      }

      setIsModalOpen(false);
      refetch();
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setSelected(id);
    setIsModalOpen(true);
    const { data } = await getUser(id);
    form.setFieldsValue(data);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Do you want to delete?",
      onOk: async () => {
        await deleteUser(id).unwrap();
        refetch();
      },
    });
  };

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => <Image style={{width:"50px"}} src={getUserPhoto(photo)} />,
    },
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (id) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(id)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(id)}
            danger
            type="primary"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex align="center" justify="space-between">
            <h2>Users ({total})</h2>
            <Form
              name="UserSearch"
              wrapperCol={{
                span: 24,
              }}
              style={{
                width: 400,
              }}
              autoComplete="off"
            >
              <Space.Compact style={{ width: "100%" }}>
                <Search
                  onChange={handleSearch}
                  placeholder="search..."
                  allowClear
                />
              </Space.Compact>
            </Form>
            <Button
              type="dashed"
              onClick={showModal}
              icon={<UserAddOutlined />}
            >
              Add user
            </Button>
          </Flex>
        )}
        loading={isFetching}
        dataSource={users}
        columns={columns}
        pagination={false}
      />
      {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={page}
          onChange={(page) => setPage(page)}
        />
      ) : null}
      <Modal
        title="User data"
        okText={selected === null ? "Add" : "Save"}
        okButtonProps={{
          icon: selected === null ? <UserAddOutlined /> : <SaveOutlined />,
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        maskClosable={false}
        confirmLoading={isModalLoading}
      >
        <Form
          name="user"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{ level: "low" }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Firstname"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {selected === null ? (
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please fill this field!",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
          ) : null}

          <Form.Item label="Role" name="role">
            <Select
              style={{ width: 120 }}
              allowClear
              options={[
                { value: "user", label: "User" },
                { value: "client", label: "Client" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
