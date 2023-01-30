import { UserOutlined } from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Space,
  theme,
  Typography
} from 'antd'

import { AuthDataType } from 'pages/Auth/Staff/graphql'

import style from './style.module.scss'

const { Title } = Typography

type FinishValuesType = {
  email: string
}

export type AuthBaseProps = {
  onFinish: (values: FinishValuesType) => void
  loading: boolean
  data?: AuthDataType | null
}

const AuthBase = ({ onFinish, loading, data }: AuthBaseProps) => {
  const { token } = theme.useToken()

  return (
    <Space direction="vertical" size="middle">
      <Card
        className={style.card}
        cover={<img src="https://placedog.net/300?random" />}
      >
        <Title level={1} style={{ fontSize: token.fontSizeHeading4 }}>
          Login
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Please input a valid e-mail'
              },
              {
                required: true,
                message: 'Please input your e-mail'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className={style['login-icon']} />}
              type="email"
              placeholder="E-mail"
            />
          </Form.Item>

          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Form.Item className={style['login-button']}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>

      {data && (
        <Alert
          message="We sent a login link to your e-mail."
          type="success"
          showIcon
        />
      )}
    </Space>
  )
}

export default AuthBase
