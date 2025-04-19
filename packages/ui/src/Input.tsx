import React from 'react'

interface inputIF{
  type: string,
  placeholder?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>)=> void
  value?: string
  className?: string
  disabled?: boolean

}

const Input: React.FC<inputIF> = ({type, placeholder, onChange, value, className, disabled}) => {
  return (
    <div>
      <input type={type ? type: "text"} placeholder={placeholder} className={`p-2 border-[1px] border-gray-200 focus:outline-none rounded-md ${className}`} value={value} onChange={onChange} disabled={disabled}/>
    </div>
  )
}

export default Input