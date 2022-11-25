import React from "react";
import { Link } from 'react-router-dom'
import Head from "./head";



const Dash = () => {
  return (
    <>
      <Head title="Hello" />
      <div id="title" className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center bg-indigo-800 p-10 rounded-xl select-none">
          <Link to="/dashboard/profile/75e66f9a-ace8-4669-9c6f-9062a988c7bc"> Go to Profile</Link>
          <span className="text-white text-right font-semibold">Dashboard</span>
        </div>
      </div>
    </>
  )
}

export default Dash