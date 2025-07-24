"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { usernameSchema } from '@/app/_lib/validators'
const Dashboard = () => {
  const {isLoaded,user} = useUser()
  const {register,handleSubmit,setValue,formState:{errors}} = useForm({
    resolver:zodResolver(usernameSchema),
  })
  const onSubmit = async(data)=>{
 
  }
  useEffect(()=>{
 setValue("username",user?.username)
  },[isLoaded])
  return (
    <div>
     <Card>
        <CardHeader>
            Welcome ,{user?.firstName}
        </CardHeader>
        {/* latest updates */}
     </Card>
      <Card className="mt-5">
        <CardHeader>
        <CardTitle>Your unique Link</CardTitle>
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div>
                    <div className='flex flex-row items-center gap-2'>
                        <span className='ml-[-25px]'>  {typeof window !== 'undefined' ? window.location.origin : ''}</span>
                        <Input {...register("username")} placeholder="username"/>
                    </div>
                    {errors.username && (
                        <p className='ml-[-25px] text-red-500 text-sm mt-1'>{errors.username.message}</p>
                    )}
                </div>
                <Button className='ml-[-25px]' type="submit">Update username</Button>
            </form>
        </CardContent>
        </CardHeader>
        {/* latest updates */}
     </Card>
    </div>
  )
}

export default Dashboard
