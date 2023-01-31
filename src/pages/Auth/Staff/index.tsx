import { useMutation } from '@apollo/client'
import { App } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import AuthBase from 'components/AuthBase'
import { NOTIFICATION_OPTIONS } from 'constants/notifications'

import {
  AuthStaffDataType,
  AuthStaffVariablesInputType,
  AuthStaffVariablesType,
  MUTATION_AUTH_STAFF
} from './graphql'

type FinishValuesType = {
  email: string
}

const PageLoginStaff = () => {
  const { company } = useParams<AuthStaffVariablesType>()
  const { notification } = App.useApp()

  const [handleAuth, { data, loading, error }] = useMutation<
    AuthStaffDataType,
    AuthStaffVariablesInputType
  >(MUTATION_AUTH_STAFF)

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
    <AuthBase<AuthStaffDataType>
      onFinish={handleFinish}
      data={data}
      loading={loading}
    />
  )
}

export default PageLoginStaff
