import { LoadingOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { Alert, Card, Space, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import type { CookieSetOptions } from 'universal-cookie'

import { COOKIE_EXPIRES } from 'constants/cookie'

import {
  AuthByKeyDataType,
  AuthByKeyVariablesInputType,
  MUTATION_AUTH_BY_KEY
} from './graphql'

const { Paragraph } = Typography

const PageAuthByLink = () => {
  const { key } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState<null | string>(null)
  const [, setCookie] = useCookies()

  const [authByKey, { data: authData, error: authError }] = useMutation<
    AuthByKeyDataType,
    AuthByKeyVariablesInputType
  >(MUTATION_AUTH_BY_KEY)

  useEffect(() => {
    if (key) {
      authByKey({
        variables: {
          input: {
            key
          }
        }
      })
    }
  }, [])

  useEffect(() => {
    if (authData?.authByKey) {
      const { token, role } = authData.authByKey

      const cookieOptions: CookieSetOptions = {
        expires: new Date(new Date().getTime() + COOKIE_EXPIRES * 1000)
      }

      setCookie('token', token, cookieOptions)
      setCookie('role', role, cookieOptions)

      setTimeout(() => {
        navigate('/admin')
      }, 800)
    }
  }, [authData])

  useEffect(() => {
    if (authError) {
      setError('Something went wrong, please try again.')
    }
  }, [authError])

  return (
    <>
      {error ? (
        <Alert message={error} type="error" showIcon />
      ) : (
        <Card title="Signing..." bodyStyle={{ textAlign: 'center' }}>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />

            <Paragraph>You&apos;ll be redirected in a few seconds</Paragraph>
          </Space>
        </Card>
      )}
    </>
  )
}

export default PageAuthByLink
