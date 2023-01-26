import Icon from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { App, Button, Popconfirm, Space } from 'antd'
import { useEffect } from 'react'
import { BsCalendar2Check, BsCalendar2X } from 'react-icons/bs'

import { NOTIFICATION_OPTIONS } from 'constants/notifications'

import {
  CheckInDataType,
  CheckVariablesType,
  MUTATION_CHECKIN,
  MUTATION_CHECKOUT
} from './graphql'

type PetActionsProps = {
  id: string
  name?: string
  callback: () => void
}

const PetActions = ({ id, name, callback }: PetActionsProps) => {
  const { notification } = App.useApp()

  const [checkin, { error: checkinError }] = useMutation<
    CheckInDataType,
    CheckVariablesType
  >(MUTATION_CHECKIN)

  const handleCheckIn = async (id: string) => {
    await checkin({
      variables: {
        petId: id
      }
    })

    await callback()
  }

  const [checkout, { error: checkoutError }] = useMutation<
    CheckInDataType,
    CheckVariablesType
  >(MUTATION_CHECKOUT)

  const handleCheckOut = async (id: string) => {
    await checkout({
      variables: {
        petId: id
      }
    })

    await callback()
  }

  useEffect(() => {
    if (checkinError) {
      notification.error({
        ...NOTIFICATION_OPTIONS,
        message: 'Error',
        description: checkinError.message
      })
    }

    if (checkoutError) {
      notification.error({
        ...NOTIFICATION_OPTIONS,
        message: 'Error',
        description: checkoutError.message
      })
    }
  }, [checkinError, checkoutError])

  return (
    <Space>
      <Popconfirm
        title="Checkin"
        description={`Are you sure you want to checkin ${name}?`}
        onConfirm={() => handleCheckIn(id)}
      >
        <Button
          type="primary"
          size="large"
          icon={<Icon component={BsCalendar2Check} />}
        >
          Checkin
        </Button>
      </Popconfirm>

      <Popconfirm
        title="Checkin"
        description={`Are you sure you want to checkout ${name}?`}
        onConfirm={() => handleCheckOut(id)}
      >
        <Button
          type="primary"
          size="large"
          icon={<Icon component={BsCalendar2X} />}
          danger
        >
          Checkout
        </Button>
      </Popconfirm>
    </Space>
  )
}

export default PetActions
