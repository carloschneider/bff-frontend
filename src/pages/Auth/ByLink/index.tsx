import { LoadingOutlined } from '@ant-design/icons'
import { gql, useMutation } from '@apollo/client'
import { Card, Space, Spin, Typography } from 'antd'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Paragraph } = Typography

const PageAuthByLink = () => {
  const { key } = useParams()
  const navigate = useNavigate()

  const MUTATION_AUTH_BY_KEY = gql`
    mutation AuthByKey($input: AuthKeyInput!) {
      authByKey(input: $input) {
        token
        role
      }
    }
  `
  const [authByKey] = useMutation(MUTATION_AUTH_BY_KEY)

  useEffect(() => {
    let response = null

    const handleAuthByKey = async () => {
      response = await authByKey({
        variables: {
          input: {
            key
          }
        }
      })

      const { data: { authByKey: { token, role } } } = response

      const cookieOptions = {
        expires: 172800
      }

      Cookies.set('token', token, cookieOptions)
      Cookies.set('role', role, cookieOptions)

      if (response.data.authByKey.token) {
        setTimeout(() => {
          navigate('/admin')
        }, 800)
      }
    }

    handleAuthByKey()
  }, [])

  return (
    <Card title="Signing..." bodyStyle={{ textAlign: 'center' }}>
      <Space direction="vertical" size="large">
        <Spin indicator={antIcon} />
        <Paragraph>You&apos;ll be redirected in a few seconds</Paragraph>
      </Space>
    </Card>
  )
}

export default PageAuthByLink
