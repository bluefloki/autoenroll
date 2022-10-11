import "./style.css"
import React, { useEffect } from "react"
import { useStorage } from "@plasmohq/storage"
import { EnrollmentForm } from "./lib/components/EnrollmentForm"
import { EnrollmentCountdown } from "~lib/components/EnrollmentCountdown"

function IndexPopup() {
  // state
  const [heading] = useStorage("heading")
  const [enrollment] = useStorage("enrollment")

  if (heading !== "Shopping Cart")
    return (
      <main className="w-[300px] p-12 flex flex-col justify-center">
        <div className="text-center">
          <p className="text-lg">
            Please navigate to the <b className="font-bold">Shopping Cart</b>{" "}
            page, or click the button below to read the guide
          </p>
          <button className="btn mt-4 btn-primary">Guide</button>
        </div>
      </main>
    )
  else if (!enrollment)
    return (
      <main className="w-[300px] p-12 flex flex-col justify-center">
        <EnrollmentForm />
      </main>
    )
  else
    return (
      <main className="w-[300px] p-12 flex flex-col justify-center">
        <EnrollmentCountdown />
      </main>
    )
}

export default IndexPopup
