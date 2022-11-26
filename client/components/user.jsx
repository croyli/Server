import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Head from './head'
import Header from './header'

const User = () => {
  const { user } = useParams()
  return (
    <>
      <Head title="Hello" />
      <Header />
      <div id="title" className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center bg-indigo-800 p-10 rounded-xl select-none">
          <Link className="text-white text-right font-semibold" to="/dashboard">
            {' '}
            Go to Root
          </Link>
          <hr />
          <Link className="text-white text-right font-semibold" to="/dashboard/main">
            Go to main
          </Link>
          <hr />
          <span className="text-white text-right font-semibold">Profile</span>
          <hr />
          <div id="username" className="text-white text-right font-semibold">
            {user}
          </div>
        </div>
      </div>
    </>
  )
}

export default User
