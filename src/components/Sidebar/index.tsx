import { DollarCircleOutlined, LogoutOutlined, DashboardOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Layout, Menu, MenuProps } from 'antd'
import { FaPaw } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout

const items: MenuItem[] = [
  {
    label: <Link to="/">Dashboard</Link>,
    key: '/',
    icon: <DashboardOutlined style={{ fontSize: '18px' }} />
  },
  {
    label: <Link to="/invoices">Invoices</Link>,
    key: '/invoices',
    icon: <DollarCircleOutlined style={{ fontSize: '18px' }} />
  },
  {
    label: <Link to="/pets">Pets</Link>,
    key: '/pets',
    icon: <FaPaw style={{ fontSize: '18px' }} />
  },
  {
    label: <Link to="/tutors">Tutors</Link>,
    key: '/tutors',
    icon: <UsergroupAddOutlined style={{ fontSize: '18px' }} />
  },
  {
    label: <Link to="/staff">Staff</Link>,
    key: '/staff',
    icon: <UsergroupAddOutlined style={{ fontSize: '18px' }} />
  },
  {
    label: <Link to="/logout">Logout</Link>,
    key: '/logout',
    icon: <LogoutOutlined style={{ fontSize: '18px' }} />
  }
]

const Sidebar = () => {
  const location = useLocation()

  return (
    <Layout style={{ height: '100%' }}>
      <Sider width="100%" theme="light">
        <Menu
          items={items}
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
