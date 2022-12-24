import { Layout, theme } from 'antd'

import style from './style.module.css'

const { Content } = Layout

type TemplateLoginProps = {
  Outlet: React.ReactNode
}

const TemplateLogin = ({ Outlet }: TemplateLoginProps) => {
  const {
    token: {
      colorBgContainer
    }
  } = theme.useToken()

  return (
    <Layout style={{ backgroundColor: colorBgContainer }}>
      <Content>
        <div className={style['login-wrap']} style={{ backgroundColor: colorBgContainer }}>
          <h1>Login</h1>
          {Outlet}
        </div>
      </Content>
    </Layout>
  )
}

export default TemplateLogin
