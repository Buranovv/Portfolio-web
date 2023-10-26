import { Fragment, useState } from "react";
import {
  Button,
  Flex,
  Form,
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
import {
  useAddEducationMutation,
  useDeleteEducationMutation,
  useGetEducationMutation,
  useGetEducationsQuery,
  useUpdateEducationMutation,
} from "../../../redux/queries/education";

const EducationPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data: { educations, total } = { educations: [], total: 0 },
    isFetching,
    refetch,
  } = useGetEducationsQuery({ page, search });

  const [addEducation] = useAddEducationMutation();
  const [updateEducation] = useUpdateEducationMutation();
  const [getEducation] = useGetEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();

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
      values.startDate = new Date(values.startDate).toISOString();
      values.endDate = new Date(values.endDate).toISOString();
      if (selected === null) {
        await addEducation(values).unwrap();
      } else {
        await updateEducation({ body: values, id: selected }).unwrap();
      }

      setIsModalOpen(false);
      refetch();
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleEdit = async (id) => {
    console.log(id);
    setSelected(id);
    setIsModalOpen(true);
    const { data } = await getEducation(id);
    const newData = {
      ...data,
      startDate: new Date(data?.startDate).toISOString().substring(0, 10),
      endDate: new Date(data?.endDate).toISOString().substring(0, 10),
    };
    form.setFieldsValue(newData);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Do you want to delete?",
      onOk: async () => {
        await deleteEducation(id).unwrap();
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
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user) => `${user?.firstName} ${user?.lastName}`,
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
            <h2>Educations ({total})</h2>
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
              Add education
            </Button>
          </Flex>
        )}
        loading={isFetching}
        dataSource={educations}
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
        title="Education data"
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
          name="education"
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
          <Form.Item name="level">
            <Select
              style={{ width: 120 }}
              allowClear
              options={[
                { value: "high", label: "High" },
                { value: "middle", label: "Middle" },
                { value: "low", label: "Low" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
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
            label="Start date"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="End date"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default EducationPage;
