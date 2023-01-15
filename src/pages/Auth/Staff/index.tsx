import { UserOutlined } from '@ant-design/icons'
import { gql, useMutation } from '@apollo/client'
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
import { useParams } from 'react-router-dom'

import style from './style.module.scss'

const { Title } = Typography

type FinishValuesType = {
  email: string
}

const PageLoginStaff = () => {
  const { token } = theme.useToken()
  const { company } = useParams()

  const MUTATION_AUTH = gql`
    mutation AuthStaff($input: EmailAuthInput!) {
      authStaff(input: $input) {
        id
      }
    }
  `

  const [handleAuth, { data, loading, error }] = useMutation(MUTATION_AUTH)

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

  return (
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
          {data && (
            <Alert
              message="We sent a login link to your e-mail."
              type="success"
              showIcon
            />
          )}

          <Form.Item className={style['login-button']}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Card>
  )
}

export default PageLoginStaff
