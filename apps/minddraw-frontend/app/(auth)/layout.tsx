import React from 'react'

const layout = (props: { children: React.ReactNode }) => {
  return (
   <main className='bg-[url("/images/authbg.jpg")] bg-no-repeat  bg-cover bg-center'>
     {props.children}
   </main>
  )
}

export default layout