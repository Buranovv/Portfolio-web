import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
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
import {
  addSkill,
  deleteSkill,
  editSkill,
  getSkill,
  getSkills,
  skillName,
} from "../../../redux/slices/skills";
import { LIMIT } from "../../../constants";

const SkillsPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [callback, setCallback] = useState(false);

  const { skills, loading, total, isModalLoading } = useSelector(
    (state) => state[skillName]
  );

  const refetch = () => {
    setCallback(!callback);
  };

  useEffect(() => {
    dispatch(getSkills({ search, page }));
  }, [dispatch, search, page, callback]);

  const showModal = () => {
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
    const values = await form.validateFields();
    if (selected === null) {
      await dispatch(addSkill({ values }));
    } else {
      await dispatch(editSkill({ id: selected, values }));
    }
    setIsModalOpen(false);
    refetch();
  };

  const handleEdit = async (id) => {
    setSelected(id);
    setIsModalOpen(true);
    const { payload } = await dispatch(getSkill(id));
    form.setFieldsValue(payload);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Do you want to delete?",
      onOk: async () => {
        await dispatch(deleteSkill(id));
        refetch();
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Fullname",
      render: (_, row) =>
        `${row?.user?.firstName ?? ""} ${row?.user?.lastName ?? ""}`,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (id) => (
        <Space size="middle">
          {/* <Link to={`/teachers/${id}`}>
            <Button type="dashed">See students</Button>
          </Link> */}
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
            <h2>Skills ({total})</h2>
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
            <Button
              type="dashed"
              onClick={showModal}
              icon={<UserAddOutlined />}
            >
              Add skill
            </Button>
          </Flex>
        )}
        loading={loading}
        dataSource={skills}
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
        title="Teacher data"
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
          name="teacher"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            isMarried: false,
          }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
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
            label="Percent"
            name="percent"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SkillsPage;
