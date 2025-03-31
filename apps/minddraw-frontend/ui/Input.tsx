import React from 'react'

interface inputIF{
  type: string,
  placeholder?: string,
  onChange?: ()=> void

}

const Input: React.FC<inputIF> = ({type, placeholder, onChange}) => {
  return (
    <div>
      <input type={type ? type: "text"} placeholder={placeholder} className={`p-2 border-[1px] border-gray-400 focus:outline-none`} onChange={onChange}/>
    </div>
  )
}

export default Input