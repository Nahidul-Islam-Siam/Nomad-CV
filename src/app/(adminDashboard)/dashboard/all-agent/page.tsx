import AllAgent from '@/components/Dashboard/agent/AllAgent'
import AgentSearchAndRefresh from '@/components/Dashboard/shared/AgentSearchAndRefresh'
import DashboardCommonHeader from '@/components/Dashboard/shared/DashboardCommonHeader'
import React from 'react'

export default function page() {
  return (
     <div>
          <DashboardCommonHeader title='Agent List'/>
          <AgentSearchAndRefresh/>
          <AllAgent/>
        </div>
  )
}
