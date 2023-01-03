import { gql, useLazyQuery, useQuery } from '@apollo/client'
import {
  Col,
  Descriptions,
  Pagination,
  Row,
  Skeleton,
  Space,
  Table,
  Typography
} from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig
} from 'antd/es/table/interface'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CheckResponsible from 'components/CheckResponsible'
import PetActions from 'components/PetActions'
import { convertOrder, OrderEnum } from 'helpers/pagination/order'
import { PaginationType } from 'pages/Pets'

// Breed
export type BreedType = {
  name: string
}

// Tutor
export type TutorType = {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string
}

// Pet
export type PetType = {
  id: string
  name: string
  birthDate: Date
  breed: BreedType
  count?: number
  tutors: TutorType[]
  createdAt?: Date
}

type PetTypeData = {
  getPetById: PetType
}

type PetVariablesType = {
  petId: string
}

// Staff
export type StaffType = {
  id: string
  firstName: string
  lastName: string
}

// User
export type UserType = {
  id: string
  companyName: string
}

// Responsible
export type ResponsibleType = {
  id: string
  type: 'arrive' | 'leave'
  staff: StaffType | null
  user: UserType | null
}

// Check
export type CheckType = {
  id: string
  arrive: Date
  leave: Date
  count?: number
  responsibles: ResponsibleType[]
}

export type ChecksDataType = {
  getAllChecksByPetId: CheckType[] | undefined
}

type ChecksWhereType = {
  id?: string
}

type ChecksVariablesType = {
  where?: ChecksWhereType | null
} & PaginationType

const PagePet = () => {
  const columnsChecks: ColumnsType<CheckType> = [
    {
      title: 'Arrive',
      dataIndex: 'arrive',
      render: (value, record: CheckType) => (
        <CheckResponsible date={value} record={record} type="arrive" />
      )
    },
    {
      title: 'Leave',
      dataIndex: 'leave',
      render: (value, record: CheckType) => (
        <CheckResponsible date={value} record={record} type="leave" />
      )
    }
  ]

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

  const { petId } = useParams<keyof PetVariablesType>() as PetVariablesType

  const defaultOrder = OrderEnum.DESC
  const defaultField = 'createdAt'

  const [filters, setFilters] = useState<
    ChecksVariablesType & { page: number }
  >({
    page: 1,
    order: defaultOrder,
    field: defaultField,
    limit: 4,
    offset: 0,
    where: {
      id: petId
    }
  })

  const GET_PET_BY_ID = gql`
    query GetPetById($petId: String!) {
      getPetById(petId: $petId) {
        id
        name
        birthDate
        breed {
          name
        }
        tutors {
          id
          firstName
          lastName
          phoneNumber
        }
      }
    }
  `

  const { data: dataPet, loading: loadingPet } = useQuery<
    PetTypeData,
    PetVariablesType
  >(GET_PET_BY_ID, {
    variables: {
      petId
    }
  })

  const GET_CHECKS_BY_PET_ID = gql`
    query GetAllChecksByPetId(
      $limit: Int
      $offset: Int
      $field: String
      $order: String
      $where: CheckWhereGetAllByPetIdInput!
    ) {
      getAllChecksByPetId(
        limit: $limit
        offset: $offset
        field: $field
        order: $order
        where: $where
      ) {
        id
        arrive
        leave
        count
        responsibles {
          id
          type
          staff {
            id
            firstName
            lastName
          }
          user {
            id
            companyName
          }
        }
      }
    }
  `

  const [
    getChecks,
    { data: dataChecks, loading: loadingChecks, refetch: refetchChecks }
  ] = useLazyQuery<ChecksDataType, ChecksVariablesType>(GET_CHECKS_BY_PET_ID)

  useEffect(() => {
    getChecks({
      variables: {
        order: filters.order,
        field: filters.field,
        limit: filters.limit,
        offset: filters.offset,
        where: {
          id: petId
        }
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'no-cache'
    })
  }, [dataPet, filters])

  const handleChangeTable = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<CheckType> | SorterResult<CheckType>[]
  ) => {
    const sorterParam = sorter as SorterResult<PetType>
    const order = sorterParam.order as 'ascend' | 'descent'
    const orderConverted = convertOrder(order)
    const field = sorterParam.field as PaginationType['field']

    setFilters((prevState) => {
      return {
        ...prevState,
        order: orderConverted,
        field
      }
    })
  }

  const handleChangePagination = (pagination: number) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        page: pagination,
        offset: (pagination - 1) * prevState.limit
      }
    })
  }

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

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Row>
          <Col
            xs={24}
            sm={12}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography.Title level={3} style={{ marginBottom: 0 }}>
              Checks
            </Typography.Title>
          </Col>

          <Col xs={24} sm={12}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end'
              }}
            >
              <PetActions
                id={petId}
                name={dataPet?.getPetById.name}
                callback={refetchChecks}
              />
            </div>
          </Col>
        </Row>

        <Table
          columns={columnsChecks}
          dataSource={dataChecks?.getAllChecksByPetId}
          rowKey={(record) => record.id}
          pagination={false}
          loading={loadingChecks}
          onChange={handleChangeTable}
          bordered
        />

        <Pagination
          current={filters.page}
          pageSize={filters.limit}
          total={
            dataChecks?.getAllChecksByPetId &&
            dataChecks?.getAllChecksByPetId.length > 0
              ? dataChecks.getAllChecksByPetId[0].count
              : 1
          }
          showSizeChanger={false}
          onChange={handleChangePagination}
          style={{ display: 'flex', justifyContent: 'end' }}
        />
      </Space>

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
