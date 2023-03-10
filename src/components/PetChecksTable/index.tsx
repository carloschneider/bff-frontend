import { useLazyQuery } from '@apollo/client'
import { Col, Pagination, Row, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import CheckResponsible from 'components/CheckResponsible'
import PetActions from 'components/PetActions'
import {
  PAGINATION_DEFAULT_FIELD,
  PAGINATION_DEFAULT_OFFSET,
  PAGINATION_DEFAULT_ORDER,
  PAGINATION_DEFAULT_PAGE
} from 'constants/pagination'

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
  const [cookies] = useCookies()

  const { role } = cookies

  const [
    getChecks,
    { data: dataChecks, loading: loadingChecks, refetch: refetchChecks }
  ] = useLazyQuery<ChecksDataType, ChecksVariablesType>(GET_CHECKS_BY_PET_ID)

  const [filters, setFilters] = useState<
    ChecksVariablesType & { page: number }
  >({
    page: PAGINATION_DEFAULT_PAGE,
    order: PAGINATION_DEFAULT_ORDER,
    field: PAGINATION_DEFAULT_FIELD,
    limit: 4,
    offset: PAGINATION_DEFAULT_OFFSET,
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

  const handleChangePagination = (pagination: number) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        page: pagination,
        offset: (pagination - 1) * prevState.limit
      }
    })
  }

  const total =
    dataChecks?.getAllChecksByPetId &&
    dataChecks?.getAllChecksByPetId.length > 0 &&
    dataChecks.getAllChecksByPetId[0].count

  return (
    <Space direction="vertical" size="middle" className={style.wrap}>
      <Row>
        <Col xs={24} sm={12} style={{ display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ marginBottom: 0 }}>
            Checks
          </Title>
        </Col>

        {role !== 'TUTOR' && (
          <Col xs={24} sm={12} className={style.buttons}>
            <PetActions id={id} name={name} callback={refetchChecks} />
          </Col>
        )}
      </Row>

      <Table
        columns={columnsChecks}
        dataSource={dataChecks?.getAllChecksByPetId}
        rowKey={(record) => record.id}
        pagination={false}
        loading={loadingChecks}
        bordered
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
  )
}

export default PetChecksTable
