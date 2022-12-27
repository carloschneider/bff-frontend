import { Layout } from 'antd'

import style from './style.module.css'

const { Content } = Layout

type TemplateLoginProps = {
  Outlet: React.ReactNode
}

const TemplateLogin = ({ Outlet }: TemplateLoginProps) => {
  return (
    <Layout className={style.section}>
      <Content>
        <div className={style['login-wrap']}>
          {Outlet}
        </div>
      </Content>
    </Layout>
  )
}

export default TemplateLogin
