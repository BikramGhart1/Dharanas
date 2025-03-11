import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const SubProfileWrapper = React.memo(() => {
    const links = [
        { path: '.', label: 'Posts' },
        { path: 'saved', label: 'Saved' },
        { path: 'comments', label: 'Comments' },
        { path: 'liked', label: 'Liked' },
    ]
    return (
        <section>
            <div className='flex flex-row justify-around items-center  border-l border-border font-semibold'>
                {
                    links.map((link) => {
                        return <NavLink to={link.path} key={link.path} replace end className={({ isActive }) => `userNavOptions ${isActive ? 'border-b-4 border-border' : ''}`}>{link.label}</NavLink>
                    })
                }
            </div>

        </section>
    )
})

export default SubProfileWrapper;