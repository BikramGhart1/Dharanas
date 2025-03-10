import React from 'react'

export default function Sidebar() {
  return (
    <aside className='sidebars'>
      <div className='flex flex-col border-b border-solid border-gray-400 my-4 py-3'>
        <p>Overall options</p>
        <a href="#">Home</a>
        <a href="#">Create Post</a>
        <a href="#">Dummy</a>
        <a href="#">Dummy</a>
      </div>
      <div className='flex flex-col border-b border-solid border-gray-400 my-4 py-3'>
        <p>User options</p>
        <a href="#">Profile</a>
        <a href="#">Your Posts</a>
        <p>Logout</p>
      </div>
    </aside>
  )
}
