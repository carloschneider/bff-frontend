import { LoadingOutlined } from '@ant-design/icons'
import { gql, useMutation } from '@apollo/client'
import { Card, Space, Spin, Typography } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Paragraph } = Typography

const PageAuthByLink = () => {
  const { key } = useParams()

  const MUTATION_AUTH_BY_KEY = gql`
    mutation AuthByKey($input: AuthKeyInput!) {
      authByKey(input: $input)
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

      if (response.data?.authByKey === true) {
        console.log('# Redirect!')
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
