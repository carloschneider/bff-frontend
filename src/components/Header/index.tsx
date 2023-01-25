import { MenuOutlined } from '@ant-design/icons'
import { Layout, theme, Typography } from 'antd'
import React, { Dispatch, SetStateAction } from 'react'

import style from './style.module.scss'

const { Title } = Typography

type HeaderProps = {
  // setMenuCollapsed: (value: boolean | ((prevVar: boolean) => boolean)) => void
  setMenuCollapsed: Dispatch<SetStateAction<boolean>>
}

const Header = ({ setMenuCollapsed }: HeaderProps) => {
  const { token } = theme.useToken()

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setMenuCollapsed((prevState) => !prevState)
  }

  return (
    <Layout.Header className={style.header}>
      <button className={style['menu-button']} onClick={handleClickMenu}>
        <MenuOutlined />
      </button>

      <Title
        style={{ color: '#fff', fontSize: token.fontSizeHeading3, margin: 0 }}
      >
        BFF.PET
      </Title>
    </Layout.Header>
  )
}

export default Header
