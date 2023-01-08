import { MenuOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React from 'react'

import style from './style.module.scss'

type HeaderProps = {
  setMenuCollapsed: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

const Header = ({ setMenuCollapsed }: HeaderProps) => {
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setMenuCollapsed((prevState) => !prevState)
  }

  return (
    <Layout.Header className={style.header}>
      <button className={style.menu} onClick={handleClickMenu}>
        <MenuOutlined />
      </button>

      <h1 style={{ color: 'white' }}>BFF.PET</h1>
    </Layout.Header>
  )
}

export default Header
