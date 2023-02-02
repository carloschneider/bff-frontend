import { SearchOutlined } from '@ant-design/icons'
import { useLazyQuery } from '@apollo/client'
import { App, Input, Pagination, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import type { SorterResult } from 'antd/lib/table/interface'
import { debounce } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { NOTIFICATION_OPTIONS } from 'constants/notifications'
import {
  PAGINATION_DEFAULT_FIELD,
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_OFFSET,
  PAGINATION_DEFAULT_ORDER,
  PAGINATION_DEFAULT_PAGE
} from 'constants/pagination'
import { convertOrder } from 'helpers/pagination/order'
import { PetType } from 'pages/Pet/graphql'

import {
  PaginationType,
  PetsDataType,
  PetsVariablesType,
  QUERY_GET_ALL_PETS
} from './graphql'

const PagePets = () => {
  const { notification } = App.useApp()

  const columns: ColumnsType<Omit<PetType, 'tutors'>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (value, { id }) => <Link to={`/admin/pets/${id}`}>{value}</Link>,
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend']
    },
    {
      title: 'Breed',
      dataIndex: 'breed',
      key: 'breed',
      render: (_, { breed }) => breed.name,
      width: 200
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

  const [filters, setFilters] = useState<PetsVariablesType & { page: number }>({
    page: PAGINATION_DEFAULT_PAGE,
    order: PAGINATION_DEFAULT_ORDER,
    field: PAGINATION_DEFAULT_FIELD,
    limit: PAGINATION_DEFAULT_LIMIT,
    offset: PAGINATION_DEFAULT_OFFSET,
    where: null
  })

  const [getPets, { loading, data, error }] = useLazyQuery<
    PetsDataType,
    PetsVariablesType
  >(QUERY_GET_ALL_PETS)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event

    if (!value) {
      setFilters((prevState) => {
        return {
          ...prevState,
          where: null
        }
      })

      return true
    }

    setFilters((prevState) => {
      return {
        ...prevState,
        where: {
          name: value
        }
      }
    })
  }

  const handleDebounceSearch = useMemo(
    () => debounce(handleSearchChange, 300),
    []
  )

  const handleChangeTable = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __: any,
    sorter:
      | SorterResult<Omit<PetType, 'tutors'>>
      | SorterResult<Omit<PetType, 'tutors'>>[]
  ) => {
    const sorterParam = sorter as SorterResult<PetType>
    const order = sorterParam.order as 'ascend' | 'descent'
    const orderConverted = convertOrder(order)
    const field = sorterParam.field as PaginationType['field']

    setFilters((prevState) => {
      return {
        ...prevState,
        order: orderConverted,
        field: field
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

  useEffect(() => {
    getPets({
      variables: {
        order: filters.order,
        field: filters.field,
        limit: filters.limit,
        offset: filters.offset,
        where: filters.where
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'no-cache'
    })
  }, [filters])

  useEffect(() => {
    if (error) {
      notification.error({
        ...NOTIFICATION_OPTIONS,
        message: 'Error',
        description: error.message
      })
    }
  }, [error])

  const total =
    data?.getAllPets && data?.getAllPets.length > 0 && data?.getAllPets[0].count

  return (
    <>
      <Typography.Title level={2}>Pets</Typography.Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Input
          type="search"
          size="large"
          placeholder="Search by pet name"
          prefix={<SearchOutlined />}
          onChange={handleDebounceSearch}
        />

        <Table
          columns={columns}
          dataSource={data?.getAllPets}
          rowKey={(record) => record.id}
          pagination={false}
          loading={loading}
          onChange={handleChangeTable}
          scroll={{ x: 800 }}
        />

        {total && total > filters.limit && (
          <Pagination
            current={filters.page}
            pageSize={filters.limit}
            total={total}
            showSizeChanger={false}
            onChange={handleChangePagination}
            style={{ display: 'flex', justifyContent: 'end' }}
          />
        )}
      </Space>
    </>
  )
}

export default PagePets
