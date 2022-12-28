import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PageLogout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = async () => {
      Cookies.remove('token')
      Cookies.remove('role')

      navigate('/')
    }

    handleLogout()
  }, [])

  return null
}

export default PageLogout
