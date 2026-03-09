import DashboardCommonHeader from '@/components/Dashboard/shared/DashboardCommonHeader'
import OrdersList from '@/components/Dashboard/orders/OrdersList'
import React from 'react'

export default function page() {
  return (
    <div>
         <DashboardCommonHeader title='Property List'/>
        <OrdersList/>
        </div>
  )
}
