import {Modal, Form, notification} from 'antd';
import {KeyOutlined, UserOutlined} from '@ant-design/icons';
import { Input } from 'antd';
import useLogin from "@/api/useLogin";
import {useCallback} from "react";

type LoginFormType = {
    email: string;
    senha: string;
};

type LoginModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function LoginModal({ open, setOpen }: LoginModalProps) {
    const [form] = Form.useForm<LoginFormType>();
    const { mutate: loginMutate, status } = useLogin({
        successCallback: () => {
            form.resetFields();
            setOpen(false);
            notification.success({
                message: 'Login successful',
                description: 'You have been logged in'
            });
        },
        errorCallback: (error) => {
            notification.error({
                message: 'Login failed',
                description: error.message
            });
        }
    });

    const onFinish = useCallback(async (values: LoginFormType) => {
        if (!values.email || !values.senha) {
            return;
        }

        loginMutate(values);
    }, [loginMutate])

    return <Modal
        open={open}
        title="Login"
        okText="Login"
        okButtonProps={{ loading: status === 'pending' }}
        cancelButtonProps={{ disabled: status === 'pending' }}
        cancelText="Cancel"
        onCancel={() => {
            form.resetFields()
            setOpen(false);
        }}
        onOk={() => {
            form.submit();
        }}
    >
        <Form
            name={'login'}
            form={form}
            preserve={false}
            onFinish={onFinish}
        >
            <Form.Item<LoginFormType>
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: "email" }
                ]}
            >
                <Input placeholder="Email" prefix={<UserOutlined />} type="email" />
            </Form.Item>

            <Form.Item<LoginFormType>
                name="senha"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder="Password" prefix={<KeyOutlined />} />
            </Form.Item>
        </Form>
    </Modal>
}