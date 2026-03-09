import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    

    const responseGoogle = async(authResult: any) => {
        setLoading(true)
        try {
            const result =  await axios.post('')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>Login</div>
  )
}

export default Login