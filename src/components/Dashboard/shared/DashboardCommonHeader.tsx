import React from 'react'

export default function DashboardCommonHeader({title}:{title:string}) {
  return (
    <div className="space-y-3 mb-10">
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
  )
}
