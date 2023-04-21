import React, { useContext, useState, useEffect } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import {
  Popconfirm,
  Button,
  Form,
  Input,
  List,
  Tag,
  Modal,
  notification,
} from "antd";
import {
  getTodolist,
  asyncUpdateTodo,
  asyncDeleteTodo,
  asyncCreateTodo,
  searchTodoAction,
} from "./store/action";
import { selectSetLoading, selectTodoList } from "./store/selector";
import { AuthContext } from "../../authUser/AuthContext";
import { createStructuredSelector } from "reselect";
import {
  DeleteOutlined,
  CheckOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import "./index.css";
const Home = (props) => {
  const { todoList } = props;
  const { getDataTodo, updateTodo, delTodo, createTodo, searchTodo } = props;
  const { logoutUser } = useContext(AuthContext);
  const [changeState, setChangeState] = useState(false);
  const data = todoList;
  const logout = () => logoutUser();

  //notification
  const openNotification = (title, content, icon) => {
    notification.open({
      message: title,
      description: content,
      icon: icon ? (
        <CheckOutlined style={{ color: "green" }} />
      ) : (
        <SmileOutlined style={{ color: "red" }} />
      ),
    });
  };
  useEffect(() => {
    getDataTodo();
  }, [changeState]);

  // change status
  const checkedStatus = async (e) => {
    const updateData = {
      id: e.target.id,
      status: e.target.checked,
    };
    const response = await updateTodo(updateData);
    if (response.success) {
      openNotification("Success", response.message, true);
    } else {
      openNotification("Failed", response.message, false);
    }
    setChangeState(!changeState);
  };

  // del todo
  const confirmDelete = (id) => {
    delClick(id);
  };
  const delClick = async (id) => {
    const respone = await delTodo(id);
    if (respone.success) {
      openNotification("Success", "Delete Successful !", true);
    } else {
      openNotification("Failed", "Delete Failed !", false);
    }
    setChangeState(!changeState);
  };

  // add new todo
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = async (values) => {
    const params = {
      title: values.title,
      discription: values.discription,
    };
    const respone = await createTodo(params);
    if (respone.success) {
      openNotification("Success", "Delete Successful !", true);
    } else {
      openNotification("Failed", "Delete Failed !", false);
    }
    setChangeState(!changeState);
    setOpen(false);
  };

  // Search
  const searchClick = async (e) => {
    const params = {
      searchValue: e.target.value,
    };
    await searchTodo(params);
  };

  return (
    <div className="wrap">
      <div className="header-wrap">
        <div className="header">
          <h2 className="header-title">Todo list</h2>
          <Button type="primary" className="header-btn Logout" onClick={logout}>
            Log Out
          </Button>
        </div>
      </div>
      <div className="content">
        <Button type="primary" className="header-btn" onClick={openModal}>
          Add new task
        </Button>
        <div className="tab-container">
          <Button
            type="primary"
            className="tab-action"
            value="All"
            onClick={searchClick}
          >
            All
          </Button>
          <Button
            type="primary"
            className="tab-action"
            value="Done"
            onClick={searchClick}
          >
            Done
          </Button>
          <Button
            type="primary"
            className="tab-action"
            value="Notdone"
            onClick={searchClick}
          >
            Todo
          </Button>
        </div>
        <List
          locale={{
            emptyText: "There's nothing to do :(",
          }}
          loading={props.isLoading}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              {item.status ? (
                <Tag color="#87d068">done</Tag>
              ) : (
                <Tag color="red">to do</Tag>
              )}
              <div className="todo-content">
                <h1 className={item.status ? "todo-done" : "todo-notdone"}>
                  {item.todoName}
                </h1>
                <h3 className={item.status ? "todo-done" : "todo-notdone"}>
                  {item.todoDiscription}
                </h3>
              </div>
              <div className="todo-action">
                <Input
                  type="checkbox"
                  defaultChecked={item.status}
                  id={item._id}
                  onChange={checkedStatus}
                  className="todo-checkbox"
                />
                <Popconfirm
                  title="Are you sure to delete this device?"
                  onConfirm={() => confirmDelete(item._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  {" "}
                  <Button className="del-btn">
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>
              </div>
            </List.Item>
          )}
        />
      </div>

      {/* modal */}
      <Modal
        title={"NEW TODO"}
        open={open}
        onCancel={handleCancel}
        style={{ top: 100 }}
        footer={
          <Button type="primary" htmlType="submit" form="formModal">
            ADD
          </Button>
        }
      >
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          name="formModal"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input device model!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Discription" name="discription">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStatetoProps = createStructuredSelector({
  isLoading: selectSetLoading,
  todoList: selectTodoList,
});

const mapDispatchToProps = (dispatch) => ({
  getDataTodo: () => dispatch(getTodolist()),
  updateTodo: (payload) => asyncUpdateTodo(dispatch)(payload),
  delTodo: (payload) => asyncDeleteTodo(dispatch)(payload),
  createTodo: (payload) => asyncCreateTodo(dispatch)(payload),
  searchTodo: (payload) => dispatch(searchTodoAction(payload)),
});

const withConnect = connect(mapStatetoProps, mapDispatchToProps);

export default compose(withConnect)(Home);
