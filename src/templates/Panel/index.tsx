import { Layout, theme } from 'antd'
import { Footer } from 'antd/lib/layout/layout'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import Breadcrumb from 'components/Breadcrumb'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import DynamicBreadcrumbProvider from 'context/DynamicBreadcrumb'

import style from './style.module.scss'

type TemplatePanelProps = {
  Outlet: React.ReactNode
}

const TemplatePanel = ({ Outlet }: TemplatePanelProps) => {
  const { token } = theme.useToken()
  const [cookies] = useCookies()

  const { role } = cookies

  const navigate = useNavigate()

  const [menuCollapsed, setMenuCollapsed] = useState(false)

  useEffect(() => {
    if (!role) {
      navigate('/')
    }
  }, [])

  const { Content } = Layout

  return (
    <DynamicBreadcrumbProvider>
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
    </DynamicBreadcrumbProvider>
  )
}

export default TemplatePanel

// type TemplatePanelProps = {
//   Outlet: React.ReactNode
// }

// const TemplatePanel = ({ Outlet }: TemplatePanelProps) => {
//   console.trace()

//   return <h1>Title</h1>
// }

// export default TemplatePanel
