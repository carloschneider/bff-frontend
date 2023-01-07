import Icon from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { Button, Popconfirm, Space } from 'antd'
import { BsCalendar2Check, BsCalendar2X } from 'react-icons/bs'

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
  const [checkin] = useMutation<CheckInDataType, CheckVariablesType>(
    MUTATION_CHECKIN
  )

  const handleCheckIn = async (id: string) => {
    try {
      await checkin({
        variables: {
          petId: id
        }
      })

      await callback()
    } catch (error) {
      console.error(error)
    }
  }

  const [checkout] = useMutation<CheckInDataType, CheckVariablesType>(
    MUTATION_CHECKOUT
  )

  const handleCheckOut = async (id: string) => {
    try {
      await checkout({
        variables: {
          petId: id
        }
      })

      await callback()
    } catch (error) {
      console.error(error)
    }
  }

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
