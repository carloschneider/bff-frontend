import { Layout, theme } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Breadcrumb from 'components/Breadcrumb'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

import style from './style.module.scss'

type TemplatePanelProps = {
  Outlet: React.ReactNode
}

const TemplatePanel = ({ Outlet }: TemplatePanelProps) => {
  const { token } = theme.useToken()

  const role = Cookies.get('role')

  const navigate = useNavigate()

  const [menuCollapsed, setMenuCollapsed] = useState(false)

  useEffect(() => {
    if (!role) {
      navigate('/')
    }
  }, [])

  const { Content } = Layout

  return (
    <>
      <Layout className={style.layout}>
        <Header setMenuCollapsed={setMenuCollapsed} />

        <Layout>
          <Sidebar
            collapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
          />

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb />

            <div
              style={{
                padding: token.paddingContentHorizontal,
                background: token.colorBgContainer
              }}
            >
              {Outlet}
            </div>
          </Content>
        </Layout>

        <Footer>Footer</Footer>
      </Layout>
    </>
  )
}

export default TemplatePanel
