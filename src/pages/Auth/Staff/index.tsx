import { Button, Form, Input } from 'antd'
import { useState } from 'react'

type FinishValuesType = {
  email: string
}

const PageLoginStaff = () => {
  const [loading, setLoading] = useState(true)

  const handleFinish = (values: FinishValuesType) => {
    console.log(values)
  }

  return (
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
        <Input type="email" placeholder="E-mail" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>Login</Button>
      </Form.Item>
    </Form>
  )
}

export default PageLoginStaff
