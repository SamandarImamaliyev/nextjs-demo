"use server"

import { signupSchema } from "@/app/(auth)/signup/components/SignupForm"
import prisma from "@/lib/prisma"
import { z } from "zod"

export const signup = async (values: z.infer<typeof signupSchema>) => {
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email: values.email
            }
        })

        if (existingUser) {
            return {
                success: false,
                message: "Email in use",
                status: 401
            }
        }

        const createdUser = await prisma.user.create({
            data: {
                username: values.username,
                email: values.email,
                hashedPassword: 
            }
        })
    } catch (error) {

    }
}