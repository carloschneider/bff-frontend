import { useMutation } from '@apollo/client'
import { App } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import AuthBase from 'components/AuthBase'
import { NOTIFICATION_OPTIONS } from 'constants/notifications'

import {
  AuthTutorDataType,
  AuthTutorVariablesInputType,
  AuthTutorVariablesType,
  MUTATION_AUTH_TUTOR
} from './graphql'

type FinishValuesType = {
  email: string
}

const PageLogin = () => {
  const { company } = useParams<AuthTutorVariablesType>()
  const { notification } = App.useApp()

  const [handleAuth, { data, loading, error }] = useMutation<
    AuthTutorDataType,
    AuthTutorVariablesInputType
  >(MUTATION_AUTH_TUTOR)

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
    <AuthBase<AuthTutorDataType>
      onFinish={handleFinish}
      data={data}
      loading={loading}
    />
  )
}

export default PageLogin
