import { gql, useLazyQuery } from '@apollo/client'
import { Pagination, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import type { SorterResult } from 'antd/es/table/interface'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { convertOrder, OrderEnum } from 'helpers/pagination/order'

export type BreedType = {
  name: string
}

export type PetType = {
  id: string
  name: string
  birthDate: Date
  breed: BreedType
  count?: number
  createdAt?: Date
}

export type PetsDataType = {
  getAllPets: PetType[]
}

export type PaginationType = {
  order?: OrderEnum
  field?: keyof PetType
  limit: number
  offset: number
}

type PetsWhereType = {
  name?: string
}

export type PetsVariablesType = {
  where?: PetsWhereType | null
} & PaginationType

const PagePets = () => {
  const columns: ColumnsType<PetType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (value, { id }) => <Link to={`/admin/pet/${id}`}>{value}</Link>,
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend']
    },
    {
      title: 'Breed',
      dataIndex: 'breed',
      key: 'breed',
      render: (_, { breed }) => breed.name,
      width: 300
    },
    {
      title: 'Birth date',
      dataIndex: 'birthDate',
      key: 'birthDate',
      render: (value) => new Date(value).toLocaleDateString('pt-BR'),
      width: 200
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      defaultSortOrder: 'descend',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: (value) => new Date(value).toLocaleString('pt-BR'),
      width: 200
    }
  ]

  const QUERY_GET_ALL_PETS = gql`
    query GetAllPets($limit: Int, $offset: Int, $field: String, $order: String, $where: PetWhereInput) {
      getAllPets(limit: $limit, offset: $offset, field: $field, order: $order, where: $where) {
        id
        name
        birthDate
        createdAt
        breed {
          name
        }
        count
      }
    }
  `

  const defaultOrder = OrderEnum.DESC
  const defaultField = 'createdAt'

  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<PaginationType['order']>(defaultOrder)
  const [field, setField] = useState<PaginationType['field']>(defaultField)
  const [limit] = useState<PaginationType['limit']>(10)
  const [offset, setOffset] = useState<PaginationType['offset']>(0)
  const [where, setWhere] = useState<PetsVariablesType['where']>(null)

  const [
    getPets,
    {
      loading,
      data,
      error
    }
  ] = useLazyQuery<PetsDataType, PetsVariablesType>(QUERY_GET_ALL_PETS)

  const handleChangeTable = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __: any,
    sorter: SorterResult<PetType> | SorterResult<PetType>[]
  ) => {
    const sorterParam = sorter as SorterResult<PetType>
    const order = sorterParam.order as 'ascend' | 'descent'
    const orderConverted = convertOrder(order)
    const field = sorterParam.field as PaginationType['field']

    setOrder(orderConverted)
    setField(field as PaginationType['field'])
  }

  const handleChangePagination = (pagination: number) => {
    setPage(pagination)
    setOffset((pagination - 1) * limit)
  }

  useEffect(() => {
    getPets({
      variables: {
        order,
        field,
        limit,
        offset,
        where
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'no-cache'
    })
  }, [order, field, limit, offset, where])

  return (
    <>
      <Typography.Title level={2}>Pets</Typography.Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Table
          columns={columns}
          dataSource={data?.getAllPets}
          rowKey={(record) => record.id}
          pagination={false}
          loading={loading}
          onChange={handleChangeTable}
        />

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Pagination
            current={page}
            pageSize={limit}
            total={data?.getAllPets[0].count}
            showSizeChanger={false}
            onChange={handleChangePagination}
          />
        </div>
      </Space>
    </>
  )
}

export default PagePets
