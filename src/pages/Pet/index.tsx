import { useQuery } from '@apollo/client'
import { Descriptions, Skeleton, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import PetChecksTable from 'components/PetChecksTable'
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
  const { petId } = useParams() as PetVariablesType

  const { data: dataPet, loading: loadingPet } = useQuery<
    PetDataType,
    PetVariablesType
  >(GET_PET_BY_ID, {
    variables: {
      petId
    }
  })

  const { setTitle } = useDynamicBreadcrumbContext()

  useEffect(() => {
    setTitle(dataPet?.getPetById.name ?? null)
  }, [dataPet])

  return (
    <>
      <Typography.Title level={2}>Pet details</Typography.Title>

      <Skeleton loading={loadingPet}>
        <Descriptions>
          <Descriptions.Item label="Name" labelStyle={{ fontWeight: 'bold' }}>
            {dataPet?.getPetById.name}
          </Descriptions.Item>

          <Descriptions.Item
            label="Birth date"
            labelStyle={{ fontWeight: 'bold' }}
          >
            {new Date(dataPet?.getPetById.birthDate || '').toLocaleDateString(
              'pt-BR'
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Breed" labelStyle={{ fontWeight: 'bold' }}>
            {dataPet?.getPetById.breed.name}
          </Descriptions.Item>
        </Descriptions>
      </Skeleton>

      <PetChecksTable id={petId} name={dataPet?.getPetById.name} />

      <Typography.Title level={3}>Tutors</Typography.Title>

      <Table
        columns={columnsTutor}
        dataSource={dataPet?.getPetById.tutors}
        rowKey={(record) => record.id}
        pagination={false}
        loading={loadingPet}
        bordered
      />
    </>
  )
}

export default PagePet
