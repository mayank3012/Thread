"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ReactNode } from "react"
interface IProps {
    type: string,
    value: string,
    accordionTriggerClassName: string,
    accordionTrigger: string,
    bottomTrigger: string | null,
    bottomTriggerClassName: string,
    children: ReactNode
}
const CustomAccordion = ({
    type,
    value,
    accordionTriggerClassName = '',
    accordionTrigger,
    bottomTrigger = null,
    bottomTriggerClassName = '',
    children
}: IProps
) => {
    return (
        <Accordion type={type} collapsible>
            <AccordionItem value={value}>
                <AccordionTrigger className={accordionTriggerClassName}>{accordionTrigger}</AccordionTrigger>
                <AccordionContent>
                    {children}
                    <AccordionTrigger className={bottomTriggerClassName}>{bottomTrigger}</AccordionTrigger>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default CustomAccordion