import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PageIndex = () => {
  const token = Cookies.get('token')
  const navigate = useNavigate()

  useEffect(() => {
    console.log('/admin', token)

    if (token) {
      navigate('/admin')
    }
  })

  return (
    <h1>BFF.PET</h1>
  )
}

export default PageIndex
