import "./style.css"
import React, { useEffect, useState } from "react"
import { useStorage } from "@plasmohq/storage"
import { EnrollmentForm } from "./lib/components/EnrollmentForm"
import { EnrollmentDetail } from "~lib/components/EnrollmentDetail"
import ExtPay, { User } from "extpay"
import { SpinnerCircularFixed } from "spinners-react"

const extpay = ExtPay("autoenroll")

function IndexPopup() {
  // state
  const [heading] = useStorage("heading")
  const [enrollment] = useStorage("enrollment")
  const [user, setUser] = useState<User>()

  useEffect(() => {
    extpay.getUser().then((user) => setUser(user))
  }, [])

  if (!user)
    return (
      <main className="w-[300px] p-12 flex flex-col items-center justify-center">
        <SpinnerCircularFixed
          size={40}
          color="#000000"
          secondaryColor="#ffffff"
          speed={300}
        />
      </main>
    )

  // if (user && user.subscriptionStatus === "active") {
  if (user && user.paid) {
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
                const newURL = "http://localhost:5173#how-it-works"
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
  } else {
    return (
      <main className="w-[300px] p-12 flex flex-col justify-center">
        <p className="font-medium text-center text-lg mb-6">
          Welcome to Autoenroll 👋, the automated college course registration
          tool.
        </p>
        <button className="btn btn-primary" onClick={extpay.openPaymentPage}>
          Sign In
        </button>
      </main>
    )
  }
}

export default IndexPopup
