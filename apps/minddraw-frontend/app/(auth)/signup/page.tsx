"use client"
import AuthPage from '@/components/AuthPage'
import React from 'react'

const Signup = () => {
    const submitHandler = async(email: string, password: string)=> {
        console.log(email, password)
     }
  return (
    <div>
        <AuthPage isSignin={false} heading='Signup' submitHandler={submitHandler}/>
    </div>
  )
}

export default Signup