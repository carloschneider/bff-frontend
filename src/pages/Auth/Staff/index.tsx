import { UserOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import {
  Alert,
  App,
  Button,
  Card,
  Form,
  Input,
  Space,
  theme,
  Typography
} from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { NOTIFICATION_OPTIONS } from 'constants/notifications'

import {
  AuthDataType,
  AuthVariablesInputType,
  AuthVariablesType,
  MUTATION_AUTH
} from './graphql'
import style from './style.module.scss'

const { Title } = Typography

type FinishValuesType = {
  email: string
}

const PageLoginStaff = () => {
  const { token } = theme.useToken()
  const { company } = useParams() as AuthVariablesType
  const { notification } = App.useApp()

  const [handleAuth, { data, loading, error }] = useMutation<
    AuthDataType,
    AuthVariablesInputType
  >(MUTATION_AUTH)

  const handleFinish = (values: FinishValuesType) => {
    const { email } = values

    handleAuth({
      variables: {
        input: {
          email,
          company
        }
      }
    })
  }

  useEffect(() => {
    if (error) {
      notification.error({
        ...NOTIFICATION_OPTIONS,
        message: 'Error',
        description: error.message
      })
    }
  }, [error])

  return (
    <Space direction="vertical" size="middle">
      <Card
        className={style.card}
        cover={<img src="https://placedog.net/300?random" />}
      >
        <Title level={1} style={{ fontSize: token.fontSizeHeading4 }}>
          Login
        </Title>

        <Form layout="vertical" onFinish={handleFinish}>
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

export default PageLoginStaff
