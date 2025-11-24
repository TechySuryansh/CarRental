import React from 'react'

export const Title = ({title,subtitle,align}) => {
  return (
    <div className={`flex flex-col items-center text-center justify-center ${align === 'left' ? 'items-start text-left' : align === 'right' ? 'items-end text-right' : '' }`}>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-800'>{title}</h1>
        <p className='mt-2 text-gray-600 max-w-xl'>{subtitle}</p>

    </div>
  )
}
