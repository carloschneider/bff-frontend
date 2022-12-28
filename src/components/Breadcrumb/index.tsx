import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb as AntdBreadcrumb } from 'antd'

const Breadcrumb = () => {
  return (
    <AntdBreadcrumb>
      <AntdBreadcrumb.Item>
        <HomeOutlined />
      </AntdBreadcrumb.Item>

      <AntdBreadcrumb.Item>
        Application List
      </AntdBreadcrumb.Item>

      <AntdBreadcrumb.Item>Application</AntdBreadcrumb.Item>
    </AntdBreadcrumb>
  )
}

export default Breadcrumb
