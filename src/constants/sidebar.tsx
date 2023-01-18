import {
  DollarCircleOutlined,
  LogoutOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { type ItemType } from 'antd/es/menu/hooks/useItems'
import { FaPaw } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export type MenuItemExtended = {
  role: string[]
  key: string
}

export type MenuItemType = ItemType & MenuItemExtended

export const SIDEBAR_MENU_ITEMS: MenuItemType[] = [
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
