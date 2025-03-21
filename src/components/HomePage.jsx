import { comment } from 'postcss';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function HomePage() {
  const dispatch = useDispatch()
  const { userInfo, status, error } = useSelector((state) => state.user);
  const [showComments, setShowComments] = useState(false);

  const fakePost = [
    {
      pid: 1,
      title: "what's your deepest and darkest secret?",
      author: "Michael Angelo",
      date: Date.now(),
      content: "Title says ...",
      likes: 13,
      comments: [
        {
          cid: 1,
          comment: "ngl I thought of stealing money from my father's pocket.",
          cauthor: "Rectangle",
        }, {
          cid: 2,
          comment: "Here I'm doing data entry lacking real datas",
          cauthor: "Triangle",
        }
      ],
      image: '/images/eyesofrah.jpeg'
    },
    {
      pid: 2,
      title: "Dead Internet Theory is real",
      author: "Mr Einstein",
      date: Date.now(),
      content: "This might sound crazy, What I'm about to say. but stay with me now. I dont even think all these posts and comments here are real because It could be some guy called Bikram putting all the dummy datas for testing his application. We are not real oh God this is givning me existential dread? what's our purpose why did we even came to the existense?",
      likes: 2892,
      comments: [
        {
          cid: 1,
          comment: "Bro you tripping",
          cauthor: "Geeked_in",
        }, {
          cid: 2,
          comment: "I like making the inside references, cause I'm the professional gatekeeper they call me Pale dai",
          cauthor: "Fine_Shyt1",
        }, {
          cid: 3,
          comment: "I don't fw this",
          cauthor: "Bikram"
        }
      ],
      image: '/images/johnpork.jpeg'
    },
    {
      pid: 3,
      title: "I think I'm so mysterious and non-chalant",
      author: "Boomer Rohan",
      date: Date.now(),
      content: "That's how I think I'm",
      likes: 2,
      comments: [
        {
          cid: 1,
          comment: "Is this even sarcasm or fr?",
          cauthor: "Maidenless",
        }, {
          cid: 2,
          comment: "stfu beaches",
          cauthor: "Brainrot",
        }
      ],
      image: '/images/jokerlaugh.png'
    },


  ]

  // const commentModeHandler=()=>{
  //   setShowComments(!setShowComments);
  // }

  return (
    <main className='mainContent'>
      {userInfo ? (
        <div className='w-full flex flex-col'>
          <div className='pb-4 border-b border-border border-spacing-5 border-solid'>
            <p className='text-center pb-2 font-semibold tracking-wide text-lg '>Welcome {userInfo.username}</p>
            <div className='flex flex-row justify-between items-center'>
              <p className='opacity-60'>Feel like expressing some dharanas?</p>
              <p className='h-1 w-1 rounded-2xl bg-primary flex-1 mx-4'></p>
              <Link to='/createPost' className='border-2 border-solid border-primary hover:border-emphasis px-3 py-1 rounded-full'>Create Post</Link>
            </div>
          </div>
          <div>
            <p className='pt-3 font-semibold'>Recently posted posts</p>
          </div>
          <div>
            {
              fakePost.map((post) => {
                return <div key={post.pid} className='p-3 my-4 bg-background-secondary rounded-lg '>
                  <p className='font-bold text-primary'>{post.title}</p>
                  <p className='text-sm'>Author: <em className='text-emphasis'>{post.author}</em> </p>
                  <p className='text-sm opacity-40'>{post.date}</p>
                  <p className='pb-3'>{post.content}</p>
                  <div className='bg-gray-900 w-full flex justify-center items-center my-3'>
                    <img src={post.image} alt={post.title} className='w-2/5 py-0' />

                  </div>

                  <button className='bg-primary hover:bg-emphasis active:bg-opacity-45 px-4 py-1 rounded-lg'>Like</button>
                  <div className='flex flex-row justify-start gap-x-2 opacity-40'>
                    <button>{post.likes} Likes</button>
                    <button onClick={() => { setShowComments(!showComments) }}>{post.comments.length} Comments</button>
                  </div>
                  {
                    showComments &&

                    <div className='flex flex-col'>
                      <p className='mt-4 text-primary font-bold'>Comments</p>
                      {
                        post.comments.map((comment) => {
                          return <div key={comment.cid} className='pb-6 mb-2 flex flex-row justify-start gap-x-6 border-b border-gray-500 border-solid'>
                            <p className='text-sm text-fuchsia-500'>{comment.cauthor}</p>
                            <p>{comment.comment}</p>
                          </div>
                        })
                      }
                      <form className='flex flex-col'>
                        <label htmlFor="comment">Post a comment</label>
                        <textarea name="comment" id="comment" className='bg-transparent outline-none px-1 min-h-20 border border-text'></textarea>
                      </form>
                    </div>
                    }
                </div>
              
              })
            }
          </div>
        </div>
      ) : (
        <div className='min-h-svh flex justify-center items-center'>
          <p>{status}</p>
        </div>
      )}
    </main>
  )
}
