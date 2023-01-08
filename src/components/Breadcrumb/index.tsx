import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb, theme } from 'antd'
import { Link } from 'react-router-dom'
import useBreadcrumbs, {
  createRoutesFromChildren
} from 'use-react-router-breadcrumbs'

import { routes } from 'router'

const CustomBreadcrumb = () => {
  const { token } = theme.useToken()
  const breadCrumbs = useBreadcrumbs(createRoutesFromChildren(routes()))

  return (
    <Breadcrumb
      style={{ marginTop: token.marginSM, marginBottom: token.marginSM }}
    >
      <Breadcrumb.Item>
        <Link to="/">
          <HomeOutlined />
        </Link>
      </Breadcrumb.Item>

      {breadCrumbs.slice(2).map(({ match, key, breadcrumb }) => {
        return (
          <Breadcrumb.Item key={key}>
            <Link to={match.pathname}>{breadcrumb}</Link>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default CustomBreadcrumb
