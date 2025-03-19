import React from 'react'
import { useParams } from 'react-router-dom'

export default function User() {
    const {uid}=useParams();
    return (
        <section className='mainContent'>
            <p>This is other users</p>
            <p>{uid}</p>
        </section>
    )
}
