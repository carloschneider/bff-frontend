import { Layout } from 'antd'

import style from './style.module.scss'

type TemplateHomeProps = {
  Outlet: React.ReactNode
}

const TemplateHome = ({ Outlet }: TemplateHomeProps) => {
  return <Layout className={style.home}>{Outlet}</Layout>
}

export default TemplateHome
