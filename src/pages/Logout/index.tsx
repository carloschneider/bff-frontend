import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const PageLogout = () => {
  const navigate = useNavigate()
  const [, , removeCookie] = useCookies()

  useEffect(() => {
    const handleLogout = async () => {
      removeCookie('token')
      removeCookie('role')

      navigate('/')
    }

    handleLogout()
  }, [])

  return null
}

export default PageLogout
