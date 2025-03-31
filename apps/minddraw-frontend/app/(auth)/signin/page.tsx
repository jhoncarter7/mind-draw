
"use client"
import AuthPage from '@/components/AuthPage'
import React from 'react'

const Signin = () => {
    const submitHandler = async(email: string, password: string)=> {
       console.log(email, password)
    }
  return (
    <div className='h-screen '>
        <div>
        <AuthPage isSignin={true} heading="Login" submitHandler={submitHandler}/>
        </div>
    </div>
  )
}

export default Signin