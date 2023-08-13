import React, { useState } from "react"

export default function Inputelement() {
  const [state, setState] = useState({
    "childName": "",
  })

  const handleChange = evt => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  return (
    <>
      {/*    <!-- Component: Rounded basic input  --> */}
      <div className="relative inline-flex">
        <input
          id="childName"
          type="text"
          name="childName"
          placeholder="your name"
          value={state["id-01"]}
          onChange={(e) => setChildName(e.target.value)}
          className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
        <label
          htmlFor="childName"
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          Your name
        </label>
      </div>
      {/*    <!-- End Rounded basic input  --> */}
    </>
  )
}