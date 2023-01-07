import { Layout, Space, theme } from 'antd'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Breadcrumb from 'components/Breadcrumb'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

import style from './style.module.css'

type TemplatePanelProps = {
  Outlet: React.ReactNode
}

const TemplatePanel = ({ Outlet }: TemplatePanelProps) => {
  const {
    token: { colorBgContainer, paddingContentHorizontal }
  } = theme.useToken()
  const role = Cookies.get('role')

  const navigate = useNavigate()

  useEffect(() => {
    if (!role) {
      navigate('/')
    }
  }, [])

  return (
    <Layout className={style.wrap}>
      <div className={style.header}>
        <Header />
      </div>

      <div className={style.sidebar}>
        <Sidebar />
      </div>

      <div
        className={style.content}
        style={{ padding: paddingContentHorizontal }}
      >
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Breadcrumb />

          <div
            style={{
              padding: paddingContentHorizontal,
              background: colorBgContainer
            }}
          >
            {Outlet}
          </div>
        </Space>
      </div>

      <div className={style.footer}>Footer</div>
    </Layout>
  )
}

export default TemplatePanel
