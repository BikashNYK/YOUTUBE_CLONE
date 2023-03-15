import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import { addComment, getVideoCommentsByVideoId } from '../../actions/comments.action';
import Comment from '../Comment/Comment';
import './_comments.scss'
const Comments = ({video}) => {
  const { commentCount } = video?.statistics || {}


  const params = useParams();
  const id = Object.values(params)[0]

  const [text,setText] = useState('')

  const comments = useSelector((state)=>{
    return state.commentList.comment
  })

 const _comments = comments?.map((e)=>{
   return e.snippet.topLevelComment.snippet
 })
  
 const dispatch =  useDispatch()

 useEffect(()=>{
    dispatch(getVideoCommentsByVideoId(id))

  }, [dispatch,id])


  

  const handleComment = (e)=>{
  e.preventDefault()

  if(text.length === 0) return

  dispatch(addComment(id,text))
  setText('')
  }
  return (
    <div className='comments'>
      <p>{commentCount} comments</p>
      <div className='comment__form d-flex w-100 my-2'>

        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="avatar" className='rounded-circle mr-3' />
        <form onSubmit={handleComment} className='d-flex flex-grow-1'>
          <input type="text" className='flex-grow-1' value={text} onChange={(e)=>{
            setText(e.target.value)
          }} placeholder='Write a comment...' />
          <button className='border-0 p-2'>Comment</button>
        </form>
      </div>
        <div className="comment_list">
          {/* {[...Array(15)].map(()=>{
            return <Comment/>
          })} */}

          {_comments?.map((e,i)=>{
            return <Comment comment = {e} key={i} />
          })}
        </div>
    </div>
  )
}

export default Comments