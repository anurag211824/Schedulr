"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import EventForm from "./event-form"


export function CreateEventDrawer() {
 const [isOpen,setIsOpen] = useState(false)
 const router = useRouter()
 const searchParams= useSearchParams()


 useEffect(()=>{
    const create  =  searchParams.get('create')
    if(create === "true"){
        setIsOpen(true)
    }
 },[searchParams,router])

const handleClose = ()=>{
    setIsOpen(false)
    if(searchParams.get("create") === "true"){
        router.replace(window.location?.pathname)
    }
}
  return (
    <Drawer open= {isOpen} onClose={handleClose}>
      <DrawerContent>
     
          <DrawerHeader>
            <DrawerTitle>Create New Event</DrawerTitle>
          </DrawerHeader>
          <EventForm onSubmitForm ={()=>{
            handleClose()
          }}/>
          <DrawerFooter>
        
            <DrawerClose asChild>
              <Button onClick={handleClose} variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
     
      </DrawerContent>
    </Drawer>
  )
}
