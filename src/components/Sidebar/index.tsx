import {
  DollarCircleOutlined,
  LogoutOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  HomeOutlined
} from '@ant-design/icons'
import type { Params } from '@remix-run/router'
import { Drawer, Grid, Layout, Menu } from 'antd'
import { type ItemType } from 'antd/es/menu/hooks/useItems'
import Cookies from 'js-cookie'
import { FaPaw } from 'react-icons/fa'
import { Link, useLocation, useMatches } from 'react-router-dom'

type MenuItemExtended = {
  role: string[]
  key: string
}

type MenuItemType = ItemType & MenuItemExtended

const { Sider } = Layout
const { useBreakpoint } = Grid

type SidebarProps = {
  collapsed: boolean
  setMenuCollapsed: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

const items: MenuItemType[] = [
  {
    label: <Link to="/admin">Home</Link>,
    key: '/admin',
    icon: <HomeOutlined style={{ fontSize: '18px' }} />,
    role: ['STAFF', 'TUTOR']
  },
  {
    label: <Link to="/admin/dashboard">Dashboard</Link>,
    key: '/admin/dashboard',
    icon: <DashboardOutlined style={{ fontSize: '18px' }} />,
    role: ['USER']
  },
  {
    label: <Link to="/admin/invoices">Invoices</Link>,
    key: '/admin/invoices',
    icon: <DollarCircleOutlined style={{ fontSize: '18px' }} />,
    role: ['USER']
  },
  {
    label: <Link to="/admin/pets">Pets</Link>,
    key: '/admin/pets',
    icon: <FaPaw style={{ fontSize: '18px' }} />,
    role: ['USER', 'STAFF', 'TUTOR']
  },
  {
    label: <Link to="/admin/tutors">Tutors</Link>,
    key: '/admin/tutors',
    icon: <UsergroupAddOutlined style={{ fontSize: '18px' }} />,
    role: ['USER']
  },
  {
    label: <Link to="/admin/staff">Staff</Link>,
    key: '/admin/staff',
    icon: <UsergroupAddOutlined style={{ fontSize: '18px' }} />,
    role: ['USER']
  },
  {
    label: <Link to="/admin/logout">Logout</Link>,
    key: '/admin/logout',
    icon: <LogoutOutlined style={{ fontSize: '18px' }} />,
    role: ['USER', 'STAFF', 'TUTOR']
  }
]

type MatchesType = {
  id: string
  pathname: string
  params: Params<string>
  data: unknown
  handle: unknown
}

const selectedKey = (matches: MatchesType[]): string | null => {
  const lastMatch = matches.at(-1)

  if (!lastMatch) {
    return null
  }

  const { pathname, params } = lastMatch

  if (!Object.keys(params).length) {
    return null
  }

  let path = pathname

  Object.keys(params).forEach((item: string) => {
    const param = params[item] as string

    path = path.replace(`/${param}`, '')
  })

  return path
}

const Sidebar = ({ collapsed, setMenuCollapsed }: SidebarProps) => {
  const breakpoints = useBreakpoint()
  const location = useLocation()
  const matches = useMatches()

  const selected = selectedKey(matches)

  const role = Cookies.get('role') as string

  const MenuItems = () => (
    <Menu
      items={items.filter((item) => item.role.includes(role))}
      mode="inline"
      theme="light"
      selectedKeys={[selected ? selected : location.pathname]}
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
