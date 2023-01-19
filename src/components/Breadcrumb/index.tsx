import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb as AntdBreadcrumb, theme } from 'antd'
import { Link } from 'react-router-dom'
import useBreadcrumbs, {
  createRoutesFromChildren
} from 'use-react-router-breadcrumbs'

import { routes } from 'router'

const Breadcrumb = () => {
  const { token } = theme.useToken()
  const breadCrumbs = useBreadcrumbs(createRoutesFromChildren(routes()))

  return (
    <AntdBreadcrumb
      style={{ marginTop: token.marginSM, marginBottom: token.marginSM }}
    >
      <AntdBreadcrumb.Item>
        <Link to="/">
          <HomeOutlined />
        </Link>
      </AntdBreadcrumb.Item>

      {breadCrumbs.slice(2).map(({ match, key, breadcrumb }) => {
        return (
          <AntdBreadcrumb.Item key={key}>
            <Link to={match.pathname}>{breadcrumb}</Link>
          </AntdBreadcrumb.Item>
        )
      })}
    </AntdBreadcrumb>
  )
}

export default Breadcrumb
