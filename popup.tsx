import "./style.css"
import React from "react"
import { useStorage } from "@plasmohq/storage"
import { EnrollmentForm } from "./lib/components/EnrollmentForm"
import { EnrollmentDetail } from "~lib/components/EnrollmentDetail"

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
          <button
            className="btn mt-4 btn-primary"
            onClick={() => {
              const newURL = "https://autoenroll.co/#how-it-works"
              chrome.tabs.create({ url: newURL })
            }}>
            Guide
          </button>
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
        <EnrollmentDetail />
      </main>
    )
}

export default IndexPopup
