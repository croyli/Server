import React from 'react'
import { Link } from 'react-router-dom'
import Head from './head'
import Header from './header'

const Dash = () => {
  return (
    <>
      <Head title="Hello" />
      <Header />
      <div id="title" className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center bg-indigo-800 p-10 rounded-xl select-none">
          <Link
            className="text-white text-right font-semibold"
            to="/dashboard/profile/75e66f9a-ace8-4669-9c6f-9062a988c7bc"
          >
            {' '}
            Go to Profile
          </Link>
          <hr />
          <Link className="text-white text-right font-semibold" to="/dashboard/main">
            Go to main
          </Link>
          <hr />
          <span className="text-white text-right font-semibold">dashboard</span>
          <hr />
        </div>
      </div>
    </>
  )
}

export default Dash
