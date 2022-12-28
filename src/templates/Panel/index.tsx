import { Layout, theme } from 'antd'

import Breadcrumb from 'components/Breadcrumb'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

import style from './style.module.css'

type TemplatePanelProps = {
  Outlet: React.ReactNode
}

const TemplatePanel = ({ Outlet }: TemplatePanelProps) => {
  const { token: { colorBgContainer, paddingContentHorizontal } } = theme.useToken()
  return (
    <Layout className={style.wrap}>
      <div className={style.header}>
        <Header />
      </div>

      <div className={style.sidebar}>
        <Sidebar />
      </div>

      <div className={style.content} style={{ padding: paddingContentHorizontal }}>
        <Breadcrumb />

        <div style={{ padding: paddingContentHorizontal, background: colorBgContainer }}>
          {Outlet}
        </div>
      </div>

      <div className={style.footer}>
        Footer
      </div>
    </Layout>
  )
}

export default TemplatePanel
