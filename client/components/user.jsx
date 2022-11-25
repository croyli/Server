import React from 'react'
import { Link } from 'react-router-dom'
import Head from './head'

const User = () => {
  return (
    <>
      <Head title="Hello" />
      <div id="Profile" className="flex justify-center items-center h-screen">
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
          <span className="text-white text-right font-semibold">Dashboard</span>
          <hr />
          {/* <div id="username"></div> */}
        </div>
      </div>
    </>
  )
}

export default User
