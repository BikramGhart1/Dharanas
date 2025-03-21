import React from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'

const SubProfileWrapper = React.memo(() => {
    const { uid } = useParams();

    const { userInfo } = useSelector((state) => state.user);
    const currentUserId = userInfo?.uid;

    // const isOriginalAccountHolder=!uid || currentUserId===uid;
    const isNotOC = uid && uid !== currentUserId;
    const links = [
        { path: '.', label: 'Posts' },
        { path: 'saved', label: 'Saved' },
        { path: 'comments', label: 'Comments' },
        { path: 'liked', label: 'Liked' },
    ]

    const filteredLinks = links.filter((link) => link.path !== 'saved' && link.path !== 'liked');
    return (
        <section>
            <div className='flex flex-row justify-around items-center  border-l border-border font-semibold'>
                {
                    isNotOC ? (
                        filteredLinks.map((link) => {
                            return <NavLink to={link.path} key={link.path} replace end className={({ isActive }) => `userNavOptions px-3 py-1 ${isActive ? 'border-b-4 border-primary' : ''}`}>{link.label}</NavLink>
                        })
                    ) : (

                        links.map((link) => {
                            return <NavLink to={link.path} key={link.path} replace end className={({ isActive }) => `userNavOptions px-3 py-1 ${isActive ? 'border-b-4 border-primary ' : ''}`}>{link.label}</NavLink>
                        })
                    )
                }
            </div>

        </section>
    )
})

export default SubProfileWrapper;