import { useState, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'

const useFetchUserData = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await Auth.currentAuthenticatedUser()
        data ? setUser(data) : setUser(null)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    const HubListener = () => {
      Hub.listen('auth', data => {
        const { payload } = data
        onAuthEvent(payload)
      })
    }
    HubListener()
    return Hub.remove('auth')
  }, [])

  const onAuthEvent = payload => {
    switch (payload.event) {
      case 'signIn':
        console.log('signed in')
        break
      case 'signup':
        console.log('signed up')
        break
      case 'signout':
        console.log('signed out')
        break
      default:
        return
    }
  }

  const handleSignout = async () => {
    try {
      await Auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Error signing out user ', error)
    }
  }

  return { user, handleSignout }
}

export default useFetchUserData
