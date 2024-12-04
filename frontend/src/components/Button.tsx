import React from 'react'

const Button = ({ onClick, children }: {
    onClick?: () => void,
    children: React.ReactNode,
}) => {
  return (
    <>
        <button
          onClick={onClick}
          className="bg-[#779556] hover:bg-[#A3D160] px-10 md:px-16 py-2 md:py-4 m-8 shadow-md border-2 border-[#779556] shadow-[#5b7145] rounded-xl transition-all duration-300"
        >
          {children}
        </button>
    </>
  )
}

export default Button
