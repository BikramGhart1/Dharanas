import React from 'react'

export default function CreatePost() {
    return (
        <main className='mainContent'>
            <div>
                <h2 className='text-xl font-semibold tracking-wider'>create post</h2>
            </div>
            <div>
                <form className='flex flex-col gap-y-10'>
                    <div className='createFormElement'>
                        <label htmlFor="title">Title</label>
                        <input className='createFormElementInput focus:ring-2' type="text" name="title" id="title" autoFocus/>
                        <p className='text-right py-1 text-sm'>0/300</p>
                    </div>
                    <div className='createFormElement'>
                        <label htmlFor="desc">Description</label>
                        <textarea className='min-h-28 resize-none p-3 createFormElementInput' name="desc" id="desc"></textarea>
                    </div>
                    <div className='createFormElement'>
                        <label htmlFor="imagepost" className="border-dashed border-2 border-gray-400 text-gray-600 py-10 px-4 flex flex-col items-center justify-center cursor-pointer w-full  rounded-lg hover:bg-gray-100">
                            <span className="text-lg font-medium">Upload or Drag & Drop to Upload Image</span>
                            <input type="file" name="imagePost" id="imagepost" className="hidden" accept='image/*'/>
                        </label>                    </div>
                    <button type="submit" className='bg-primary w-max px-4 py-1 font-semibold rounded-lg m-auto hover:bg-emphasis'>Submit</button>
                </form>
            </div>
        </main>
    )
}
