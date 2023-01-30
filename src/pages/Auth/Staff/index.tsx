import { useMutation } from '@apollo/client'
import { App } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import AuthBase from 'components/AuthBase'
import { NOTIFICATION_OPTIONS } from 'constants/notifications'

import {
  AuthDataType,
  AuthVariablesInputType,
  AuthVariablesType,
  MUTATION_AUTH
} from './graphql'

type FinishValuesType = {
  email: string
}

const PageLoginStaff = () => {
  const { company } = useParams<AuthVariablesType>()
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

  return <AuthBase onFinish={handleFinish} data={data} loading={loading} />
}

export default PageLoginStaff
