
// import AllAgent from '@/components/Dashboard/agent/AllAgent'
import AllMortgage from '@/components/Dashboard/Mortgage/AllMorgage'
import AgentSearchAndRefresh from '@/components/Dashboard/shared/AgentSearchAndRefresh'
import DashboardCommonHeader from '@/components/Dashboard/shared/DashboardCommonHeader'
import React from 'react'

export default function page() {
  return (
     <div>
          <DashboardCommonHeader title='Mortgage List'/>
          <AgentSearchAndRefresh/>
          <AllMortgage/>
        </div>
  )
}
