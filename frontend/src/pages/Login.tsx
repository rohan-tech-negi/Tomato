import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../main'
import toast from 'react-hot-toast'
import {  useGoogleLogin } from '@react-oauth/google';
import {FcGoogle} from 'react-icons/fc'
import { useAppData } from '../context/AppContext'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const {setUser, setIsAuth} = useAppData()
    

    const responseGoogle = async(authResult: any) => {
        setLoading(true)
        try {
            const result =  await axios.post(`${authService}/api/auth/login`, {
                code: authResult["code"],
            });

            localStorage.setItem("token", result.data.token)
            toast.success(result.data.message)
            setLoading(false)
            setUser(result.data.user
            )
            setIsAuth(true)
            navigate("/")
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
            setLoading(false)
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code"
    })
  return (
    <div className="flex bg-white px-4 items-center justify-center min-h-screen">
        <div className='w-full max-w-sm space-y-6'>
            <h1 className='text-center text-3xl font-bold text-red'>
                Tomato
            </h1>

            <p className='text-center text-sm text-grey-500'>
                Login or sign up to continue
            </p>

            <button onClick={googleLogin} disabled={loading} className='flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3'><FcGoogle></FcGoogle> {loading ? "Signing in ..." : "Continue with Google"}</button>
            <p className='text-center text-xs text-gray-400'>
                By Continuing , you agree with our {" "} <span className='text-red-600'>Term of Service</span>
                <span className='text-red-600'> & Privacy policy</span>
            </p>
        </div>
    </div>
  )
}

export default Login