
import DashboardAgentList from '@/components/Dashboard/agent/AgentList'
import DashboardCommonHeader from '@/components/Dashboard/shared/DashboardCommonHeader'
// import Pagination from '@/components/Dashboard/shared/Pagination'
import React from 'react'

export default function page() {
  return (
     <div>
          <DashboardCommonHeader title='Agent List'/>
          <DashboardAgentList/>
    
        </div>
  )
}
