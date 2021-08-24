import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app/index";
import { useAsync } from "utils/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit: ({
    cpassword,
    ...values
  }: {
    cpassword: string;
    username: string;
    password: string;
  }) => void = async ({ cpassword, ...values }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次密码相同"));
      return;
    }
    try {
      await run(register(values));
    } catch (e) {
      onError(e);
    }
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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true }, { message: "请输入确认密码" }]}
      >
        <Input placeholder={"确认密码"} type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
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
