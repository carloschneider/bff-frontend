import { Drawer, Grid, Layout, Menu } from 'antd'
import { useCookies } from 'react-cookie'
import { useLocation, useMatches } from 'react-router-dom'

import { SIDEBAR_MENU_ITEMS } from 'constants/sidebar'
import { selectedKey } from 'helpers/sidebar/menu'

const { Sider } = Layout
const { useBreakpoint } = Grid

type SidebarProps = {
  collapsed: boolean
  setMenuCollapsed: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

const Sidebar = ({ collapsed, setMenuCollapsed }: SidebarProps) => {
  const breakpoints = useBreakpoint()
  const location = useLocation()
  const matches = useMatches()
  const [cookies] = useCookies()

  const selected = selectedKey(matches, location)

  const { role } = cookies

  const MenuItems = () => (
    <Menu
      items={SIDEBAR_MENU_ITEMS.filter((item) => item.role.includes(role))}
      mode="inline"
      theme="light"
      selectedKeys={[selected]}
      style={{ height: '100%' }}
    />
  )

  const handleClose = () => {
    setMenuCollapsed((prevState) => !prevState)
  }

  return breakpoints.lg ? (
    <Sider theme="light">
      <MenuItems />
    </Sider>
  ) : (
    <Drawer
      placement="left"
      closable={false}
      onClose={handleClose}
      open={collapsed}
      width={200}
      bodyStyle={{
        height: '100vh',
        padding: '0px',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <MenuItems />
    </Drawer>
  )
}

export default Sidebar
