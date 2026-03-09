
import DeveloperList from '@/components/Dashboard/Developer/DeveloperList'
import DashboardCommonHeader from '@/components/Dashboard/shared/DashboardCommonHeader'

import React from 'react'

export default function page() {
  return (
    <div>
            <DashboardCommonHeader title='Developer List'/>
            <DeveloperList/>
        
          </div>
  )
}
