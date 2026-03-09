
import DeveloperRequest from '@/components/Dashboard/Developer/DeveloperRequest'

import DashboardCommonHeader from '@/components/Dashboard/shared/DashboardCommonHeader'

import React from 'react'

export default function page() {
  return (
     <div>
          <DashboardCommonHeader title='Agent Request'/>
       <DeveloperRequest/>  
        </div>
  )
}
