import AgentRequest from '@/components/Dashboard/agent/AgentRequest'

import DashboardCommonHeader from '@/components/Dashboard/shared/DashboardCommonHeader'

import React from 'react'

export default function page() {
  return (
     <div>
          <DashboardCommonHeader title='Agent Request'/>
       <AgentRequest/>  
        </div>
  )
}
