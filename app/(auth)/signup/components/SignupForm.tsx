"use client"

import { signup } from '@/app/actions/auth/signup'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


export const signupSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3, "Username must be at least 3 character."),
    password: z.string().min(6, "Password must be at least 6 character."),
    confirmPassword: z.string().min(6, "Password must be at least 6 character.")
})
    .refine(schema => schema.password === schema.confirmPassword, {
        message: "Password doesn't match.",
        path: ["confirmPassword"]
    })

const SignupForm = () => {

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        },
    })

    function onSubmit(values: z.infer<typeof signupSchema>) {
        signup(values);
    }

    return (
        <div className='min-w-[400px] min-h-[600px] h-full border rounded'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password..." {...field} type='password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Confirm Password..." {...field} type='password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className={`w-full  ${cn({ "opacity-50 pointer-events-none": form.getValues().email === "" })}`}>Sign up</Button>

                    <div className=' w-full flex justify-center gap-3'>Have an account? <Link href="/signin" className='hover:underline text-red-600'>Sign in</Link> </div>
                </form>
            </Form>
        </div >
    )
}

export default SignupForm