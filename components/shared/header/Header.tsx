import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className='w-full h-20 p-4 flex items-center justify-between border-b'>
            <div>logo</div>
            <div>
                <Link href="/signin">
                    <Button>Log in</Button>
                </Link>
            </div>
        </div>
    )
}

export default Header