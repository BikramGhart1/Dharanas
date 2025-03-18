import React from 'react'

export default function RightSidebar() {

    return (
        <aside className='rightSidebar'>

            <div className='flex flex-row justify-between'>
                <h3 className='font-semibold'>Recent Posts</h3>
                <p className='font-semibold'>Clear</p>

            </div>
            <div className='flex flex-col gap-y-5 mt-4'>
                <div className='recentPostsWrapper'>
                    <p className='font-bold text-primary'>Post #1</p>
                    <p className='text-sm'>Author: <em className='text-emphasis'>Ramu</em> </p>
                    <p>post conent ...</p>
                    <img src="/images/bg-blas.png" alt="recent post" className='recentPostImg' />
                </div>
                <div className='recentPostsWrapper'>
                    <p>Post #2</p>
                    <p>post conent ...</p>
                    <img src="/images/johnpork.jpeg" alt="recent post" className='recentPostImg'/>
                </div>
                <div className='recentPostsWrapper'>
                    <p>Post #3</p>
                    <p>post conent ...</p>
                    <img src="/images/jokerlaugh.png" alt="recent post" className='recentPostImg'/>
                </div>
            </div>
        </aside>
    )
}
