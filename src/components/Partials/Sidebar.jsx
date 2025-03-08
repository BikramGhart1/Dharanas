import React from 'react'

export default function Sidebar() {
  return (
    <aside className='sidebars'>
      <div>
        <p>Overall options</p>
        <a href="#">Home</a>
        <a href="#">Create Post</a>
        <a href="#">Dummy</a>
        <a href="#">Dummy</a>
      </div>
      <div>
        <p>User options</p>
        <a href="#">Profile</a>
        <a href="#">Your Posts</a>
        <button>Logout</button>
      </div>
    </aside>
  )
}
