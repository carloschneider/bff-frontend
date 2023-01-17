import { Layout } from 'antd'

import DynamicBreadcrumbProvider from 'context/DyanmicBreadcrumbContext'

import style from './style.module.scss'

const { Content } = Layout

type TemplateLoginProps = {
  Outlet: React.ReactNode
}

const TemplateLogin = ({ Outlet }: TemplateLoginProps) => {
  return (
    <DynamicBreadcrumbProvider>
      <Layout className={style.section}>
        <Content>
          <div className={style['login-wrap']}>{Outlet}</div>
        </Content>
      </Layout>
    </DynamicBreadcrumbProvider>
  )
}

export default TemplateLogin
