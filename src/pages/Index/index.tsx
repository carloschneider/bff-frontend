import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const PageIndex = () => {
  const [cookies] = useCookies()
  const navigate = useNavigate()

  const { token } = cookies

  useEffect(() => {
    if (token) {
      navigate('/admin')
    }
  })

  return <h1>BFF.PET</h1>
}

export default PageIndex
