import React from 'react'
import PostSide from '../../componernts/Postside/PostSide'
import ProfileSide from '../../componernts/profileSide/ProfileSide'
import RightSide from '../../componernts/RightSide/RightSide'
import "./Home.css"

function Home() {
  return (
    <div className='Home'>
        <ProfileSide/>
        <PostSide/>
        <RightSide/>
    </div>
  )
}

export default Home