// import CustomerOrders from '@/components/Dashboard/customer/CustomerOrders'
import MortgageList from '@/components/Dashboard/Mortgage/MortgageList'
import DashboardCommonHeader from '@/components/Dashboard/shared/DashboardCommonHeader'
// import Pagination from '@/components/Dashboard/shared/Pagination'
import React from 'react'

export default function page() {
  return (
     <div>
          <DashboardCommonHeader title='Mortgages List'/>
          <MortgageList/>
    
        </div>
  )
}
