import { UserOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  notification,
  Space,
  theme,
  Typography
} from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
  const [api, contextHolder] = notification.useNotification()

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
      api.error({
        message: 'Error',
        description: error?.message,
        placement: 'bottomRight'
      })
    }
  }, [error])

  return (
    <Space direction="vertical" size="middle">
      {contextHolder}
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
