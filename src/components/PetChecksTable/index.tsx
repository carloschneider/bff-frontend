import { useLazyQuery } from '@apollo/client'
import { Col, Pagination, Row, Space, Table, Typography } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import { FilterValue, SorterResult } from 'antd/lib/table/interface'
import { useEffect, useState } from 'react'

import CheckResponsible from 'components/CheckResponsible'
import PetActions from 'components/PetActions'
import { convertOrder, OrderEnum } from 'helpers/pagination/order'
import { PetType } from 'pages/Pet/graphql'
import { PaginationType } from 'pages/Pets'

import {
  ChecksDataType,
  ChecksVariablesType,
  CheckType,
  GET_CHECKS_BY_PET_ID
} from './graphql'
import style from './style.module.scss'

const { Title } = Typography

type PetChecksTypeProps = {
  id: string
  name: string | undefined
}

const columnsChecks: ColumnsType<CheckType> = [
  {
    title: 'Arrive',
    dataIndex: 'arrive',
    render: (value, record: CheckType) => (
      <CheckResponsible date={value} record={record} type="arrive" />
    ),
    width: '50%'
  },
  {
    title: 'Leave',
    dataIndex: 'leave',
    render: (value, record: CheckType) => (
      <CheckResponsible date={value} record={record} type="leave" />
    ),
    width: '50%'
  }
]

const PetChecksTable = ({ id, name }: PetChecksTypeProps) => {
  const [
    getChecks,
    { data: dataChecks, loading: loadingChecks, refetch: refetchChecks }
  ] = useLazyQuery<ChecksDataType, ChecksVariablesType>(GET_CHECKS_BY_PET_ID)

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
      id
    }
  })

  useEffect(() => {
    getChecks({
      variables: {
        order: filters.order,
        field: filters.field,
        limit: filters.limit,
        offset: filters.offset,
        where: {
          id
        }
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'no-cache'
    })
  }, [filters])

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
    <Space direction="vertical" size="middle" className={style.wrap}>
      <Row>
        <Col xs={24} sm={12} style={{ display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ marginBottom: 0 }}>
            Checks
          </Title>
        </Col>

        <Col xs={24} sm={12} className={style.buttons}>
          <PetActions id={id} name={name} callback={refetchChecks} />
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
  )
}

export default PetChecksTable
