import { DollarCircleOutlined, LogoutOutlined, DashboardOutlined, UsergroupAddOutlined, HomeOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { type ItemType } from 'antd/es/menu/hooks/useItems'
import Cookies from 'js-cookie'
import { FaPaw } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

type MenuItem = ItemType & { role: string[] };

const { Sider } = Layout

const Sidebar = () => {
  const location = useLocation()
  const role = Cookies.get('role') as string

  const items: MenuItem[] = [
    {
      label: <Link to="/">Home</Link>,
      key: '/',
      icon: <HomeOutlined style={{ fontSize: '18px' }} />,
      role: ['STAFF', 'TUTOR']
    },
    {
      label: <Link to="/admin/dashboard">Dashboard</Link>,
      key: '/dashboard',
      icon: <DashboardOutlined style={{ fontSize: '18px' }} />,
      role: ['USER']
    },
    {
      label: <Link to="/admin/invoices">Invoices</Link>,
      key: '/invoices',
      icon: <DollarCircleOutlined style={{ fontSize: '18px' }} />,
      role: ['USER']
    },
    {
      label: <Link to="/admin/pets">Pets</Link>,
      key: '/pets',
      icon: <FaPaw style={{ fontSize: '18px' }} />,
      role: ['USER', 'STAFF', 'TUTOR']
    },
    {
      label: <Link to="/admin/tutors">Tutors</Link>,
      key: '/tutors',
      icon: <UsergroupAddOutlined style={{ fontSize: '18px' }} />,
      role: ['USER']
    },
    {
      label: <Link to="/admin/staff">Staff</Link>,
      key: '/staff',
      icon: <UsergroupAddOutlined style={{ fontSize: '18px' }} />,
      role: ['USER']
    },
    {
      label: <Link to="/admin/logout">Logout</Link>,
      key: '/logout',
      icon: <LogoutOutlined style={{ fontSize: '18px' }} />,
      role: ['USER', 'STAFF', 'TUTOR']
    }
  ]

  return (
    <Layout style={{ height: '100%' }}>
      <Sider width="100%" theme="light">
        <Menu
          items={items.filter(item => item.role.includes(role))}
          mode="inline"
          theme="light"
          selectedKeys={[location.pathname]}
          style={{ height: '100%' }}
        />
      </Sider>
    </Layout>
  )
}

export default Sidebar
