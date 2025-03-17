import React from 'react'

export default function RightSidebar() {

    return (
        <aside className='rightSidebar'>
            <div className='relative w-full pb-2'>
                <h2 className='text-md font-semibold'>Some Cool Users:</h2>
                <div className='flex space-x-4 overflow-x-auto w-full no-scrollbar'>
                    <div className='w-20 h-20'>
                        <img src="/images/guest.png" alt="guest" className=' aspect-square rounded-full' />
                        <p>Guest</p>
                    </div>
                    <div className='w-20 h-20'>
                        <img src="/images/guest.png" alt="guest" className=' aspect-square rounded-full' />
                        <p>Guest</p>
                    </div>
                    <div className='w-20 h-20'>
                        <img src="/images/guest.png" alt="guest" className=' aspect-square rounded-full' />
                        <p>Guest</p>
                    </div>
                    <div className='w-20 h-20'>
                        <img src="/images/guest.png" alt="guest" className=' aspect-square rounded-full' />
                        <p>Guest</p>
                    </div>
                    <div className='w-20 h-20'>
                        <img src="/images/guest.png" alt="guest" className=' aspect-square rounded-full' />
                        <p>Guest</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between'>
                <h3 className='font-semibold'>Recent Posts</h3>
                <p className='font-semibold'>Clear</p>

            </div>
            <div>
                <p>Post #1</p>
                <p>post conent ...</p>
                <img src="/images/bg-blas.png" alt="recent post" />
            </div>
            <div>
                <p>Post #2</p>
                <p>post conent ...</p>
                <img src="/images/bg-blas.png" alt="recent post" />
            </div>
            <div>
                <p>Post #3</p>
                <p>post conent ...</p>
                <img src="/images/bg-blas.png" alt="recent post" />
            </div>
        </aside>
    )
}
