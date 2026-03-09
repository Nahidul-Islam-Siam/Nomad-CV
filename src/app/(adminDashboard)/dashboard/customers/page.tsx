import CustomerOrders from '@/components/Dashboard/customer/CustomerOrders'
import DashboardCommonHeader from '@/components/Dashboard/shared/DashboardCommonHeader'
import React from 'react'

export default function page() {
  return (
    <div>
      <DashboardCommonHeader title='Customer List'/>
      <CustomerOrders/>
    </div>
  )
}
