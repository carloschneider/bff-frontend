import { useQuery } from '@apollo/client'
import { App, Descriptions, Skeleton, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import PetChecksTable from 'components/PetChecksTable'
import { NOTIFICATION_OPTIONS } from 'constants/notifications'
import { useDynamicBreadcrumbContext } from 'context/DynamicBreadcrumb'

import {
  GET_PET_BY_ID,
  PetDataType,
  PetVariablesType,
  TutorType
} from './graphql'

const columnsTutor: ColumnsType<TutorType> = [
  {
    title: 'First name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (value) => value
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
    key: 'lastName',
    render: (value) => value
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    render: (value) => value,
    width: 200
  }
]

const PagePet = () => {
  const { petId } = useParams<PetVariablesType>()
  const navigate = useNavigate()

  if (!petId) {
    navigate('/admin/pets')

    return null
  }

  const { notification } = App.useApp()

  const { data, loading, error } = useQuery<PetDataType, PetVariablesType>(
    GET_PET_BY_ID,
    {
      variables: {
        petId
      }
    }
  )

  const { setTitle } = useDynamicBreadcrumbContext()

  useEffect(() => {
    if (data) {
      setTitle(data.getPetById.name)
    }

    if (error) {
      notification.error({
        ...NOTIFICATION_OPTIONS,
        message: 'Error',
        description: error.message
      })
    }
  }, [data, error])

  return (
    <Space direction="vertical" size="middle">
      <Typography.Title level={2}>Pet details</Typography.Title>

      <Skeleton loading={loading}>
        <Descriptions>
          <Descriptions.Item label="Name" labelStyle={{ fontWeight: 'bold' }}>
            {data?.getPetById.name}
          </Descriptions.Item>

          <Descriptions.Item
            label="Birth date"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {new Date(data?.getPetById.birthDate || '').toLocaleDateString(
              'pt-BR'
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Breed" labelStyle={{ fontWeight: 'bold' }}>
            {data?.getPetById.breed.name}
          </Descriptions.Item>
        </Descriptions>
      </Skeleton>

      <PetChecksTable id={petId} name={data?.getPetById.name} />

      <Typography.Title level={3} style={{ marginBottom: 0 }}>
        Tutors
      </Typography.Title>

      <Table
        columns={columnsTutor}
        dataSource={data?.getPetById.tutors}
        rowKey={(record) => record.id}
        pagination={false}
        loading={loading}
        bordered
      />
    </Space>
  )
}

export default PagePet
