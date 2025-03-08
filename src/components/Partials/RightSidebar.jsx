import React from 'react'

export default function RightSidebar() {

    return (
        <aside className='sidebars'>
            <div className='flex flex-row justify-between'>
                <h3>Recent Posts</h3>
                <p>Clear</p>

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
