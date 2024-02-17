"use clients"

import React from 'react'
import { TabsContent } from '../ui/tabs'

interface IProps {
    tabValue: string,
    children: any
}
const CustomTabsContent = ({ tabValue, children }: IProps) => {
    return (
        <TabsContent value={tabValue}>
            {children}
        </TabsContent>
    )
}

export default CustomTabsContent