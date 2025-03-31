import React from 'react'

interface inputIF{
  type: string,
  placeholder?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>)=> void

}

const Input: React.FC<inputIF> = ({type, placeholder, onChange}) => {
  return (
    <div>
      <input type={type ? type: "text"} placeholder={placeholder} className={`p-2 border-[1px] border-gray-200 focus:outline-none rounded-md `} onChange={onChange}/>
    </div>
  )
}

export default Input