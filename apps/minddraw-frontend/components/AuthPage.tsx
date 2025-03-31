import Button from '@/ui/Button'
import Input from '@/ui/Input'
import React from 'react'

interface authPageIF{
    isSignin: boolean ,
    heading?: string  
}

const AuthPage: React.FC<authPageIF> = ({isSignin, heading}) => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <h1>{heading}</h1>
      <form action="" className='w-1/2  flex  flex-col mx-auto justify-center items-center border-2 p-12 gap-4'>
       <Input type="email" placeholder='your email'/>
       <Input type="password" placeholder='your password'/>
       <div className='w-1/4'>
       <Button className='capitalize'>
        {isSignin ? "signin": "signup"}
       </Button>
       </div>
      </form>
    </div>
  )
}

export default AuthPage