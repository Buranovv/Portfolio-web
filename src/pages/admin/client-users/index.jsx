import { Fragment, useState } from "react";
import {
  Flex,
  Form,
  Image,
  Modal,
  Pagination,
  Space,
  Switch,
  Table,
} from "antd";
import Search from "antd/es/input/Search";
import { LIMIT } from "../../../constants";

import { getUserPhoto } from "../../../utils";
import {
  useConfirmUserToClientMutation,
  useGetUsersQuery,
} from "../../../redux/queries/notClient-user";

const NotUsersPage = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data: { users, total } = { users: [], total: 0 }, isFetching } =
    useGetUsersQuery({ page, search });

  const [confirmUserToClient] = useConfirmUserToClientMutation();

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    setPage(1);
  };

  const confirmClient = (id) => {
    Modal.confirm({
      title: "Do you want to confirm to client?",
      onOk: async () => {
        const clientObj = {
          role: "client",
        };
        await confirmUserToClient({ id, body: clientObj }).unwrap();
      },
      onCancel: () => {
        form.resetFields();
      },
    });
  };

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <Image style={{ width: "50px" }} src={getUserPhoto(photo)} />
      ),
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
          <Form
            name="notUser"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            form={form}
          >
            <Form.Item name="switch">
              <Switch onChange={() => confirmClient(id)} />
            </Form.Item>
          </Form>
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
              name="search"
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
    </Fragment>
  );
};

export default NotUsersPage;
