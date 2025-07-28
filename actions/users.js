'use server'
import { db } from "@/lib/prisma"
import { auth, createClerkClient } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const clerkClient = createClerkClient({ 
    secretKey: process.env.CLERK_SECRET_KEY 
})

export async function updateUsername(username){
    const { userId } = await auth()
    console.log(userId);
    
    if(!userId){
        redirect("/sign-in")
    }

    try {
        // Check if username is already taken by another user
        const existingUsername = await db.user.findUnique({
            where: { username }
        })
        
        if(existingUsername && existingUsername.clerkUserId !== userId){
            throw new Error("Username is already taken")
        }
        
        // Update user in database
        await db.user.update({
            where: { clerkUserId: userId },
            data: { username }
        })
        
        // Update user in Clerk
        await clerkClient.users.updateUser(userId, {
            username,
        })
        
        return { success: true }
    } catch (error) {
        console.error("Error updating username:", error)
        return { error: error.message }
    }
}