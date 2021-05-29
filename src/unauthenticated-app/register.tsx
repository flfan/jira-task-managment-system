import { useAuth } from "context/auth-context";
import { Form, Button, Input } from "antd";

export const RegisterScreen = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, register } = useAuth();

  const handleSubmit: (values: { username: string; password: string }) => void =
    (values) => {
      register(values);
    };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true }, { message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true }, { message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} type={"primary"}>
          注册
        </Button>
      </Form.Item>
    </Form>
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label htmlFor="username">用户名</label>
    //     <input type="text" id="username" />
    //   </div>
    //   <div>
    //     <label htmlFor="password">密码</label>
    //     <input type="password" id="password" />
    //   </div>
    //   <button type="submit">注册</button>
    // </form>
  );
};
