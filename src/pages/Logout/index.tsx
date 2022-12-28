import { gql, useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PageLogout = () => {
  const navigate = useNavigate()

  const MUTATION_LOGOUT = gql`
    mutation Mutation {
      logout
    }
  `
  const [logout] = useMutation(MUTATION_LOGOUT)

  useEffect(() => {
    const handleLogout = async () => {
      await logout()

      navigate('/')
    }

    handleLogout()
  }, [])

  return null
}

export default PageLogout
