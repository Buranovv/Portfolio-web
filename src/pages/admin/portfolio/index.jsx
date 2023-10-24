import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  Upload,
} from "antd";

import {
  UserAddOutlined,
  SaveOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";

import { LIMIT } from "../../../constants";
import {
  addPortfolio,
  deletePortfolio,
  editPortfolio,
  getPortfolio,
  getPortfolios,
  portfolioName,
  resetPhoto,
  setPhoto,
  uploadPhoto,
} from "../../../redux/slices/portfolio";
import { getPhoto } from "../../../utils";
import { Link } from "react-router-dom";

const PortfolioPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [callback, setCallback] = useState(false);

  const { portfolios, loading, total, isModalLoading, photoData, photoLoad } =
    useSelector((state) => state[portfolioName]);

  const refetch = () => {
    setCallback(!callback);
  };

  useEffect(() => {
    dispatch(getPortfolios({ search, page }));
  }, [dispatch, search, page, callback]);

  const showModal = async () => {
    setIsModalOpen(true);
    setSelected(null);
    dispatch(resetPhoto());
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
    values.photo = photoData?._id;
    if (selected === null) {
      await dispatch(addPortfolio({ values }));
    } else {
      await dispatch(editPortfolio({ id: selected, values }));
    }
    setIsModalOpen(false);
    refetch();
  };

  const handleEdit = async (id) => {
    setSelected(id);
    setIsModalOpen(true);
    const { payload } = await dispatch(getPortfolio(id));
    dispatch(setPhoto(payload?.photo));
    form.setFieldsValue(payload);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Do you want to delete?",
      onOk: async () => {
        await dispatch(deletePortfolio(id));
        refetch();
      },
    });
  };

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <Image style={{ width: "50px" }} src={getPhoto(photo)} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Web-site",
      dataIndex: "url",
      key: "project",
      render: (url) => (
        <Link target="_blank" to={url}>
          project
        </Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
            <h2>Portfolios ({total})</h2>
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
              Add portfolio
            </Button>
          </Flex>
        )}
        loading={loading}
        dataSource={portfolios}
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
        title="Portfolio data"
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
          name="portfolio"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
          form={form}
        >
          <Upload
            name="photo"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={(e) => dispatch(uploadPhoto(e.file.originFileObj))}
          >
            <div>
              {photoLoad ? (
                <LoadingOutlined />
              ) : photoData ? (
                <img
                  src={getPhoto(photoData)}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div>upload</div>
                </div>
              )}
            </div>
          </Upload>

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
            label="Url"
            name="url"
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
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PortfolioPage;
