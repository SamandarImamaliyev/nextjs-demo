"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 character."),
})

const SigninForm = () => {

    const form = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof signinSchema>) {
        console.log(values)
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
                    <Button type="submit" className={`w-full  ${cn({ "opacity-50 pointer-events-none": form.getValues().email === "" })}`}>Sign in</Button>

                    <div className=' w-full flex justify-center gap-3'>Don't have an account? <Link href="/signup" className='hover:underline text-red-600'>Sign up</Link> </div>
                </form>
            </Form>
        </div >
    )
}

export default SigninForm