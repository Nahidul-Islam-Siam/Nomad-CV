import React from 'react'

export default function CommonHeader({header, paragraph}: {header?: string, paragraph?: string}) {
  return (
    <div className=''>
      <h1 className=" md:pt-16 text-4xl font-bold mb-6 text-center">{header}</h1>
      <p className="text-sm text-center xl:w-[50%] mx-auto">{paragraph}</p>
    </div>
  )
}
