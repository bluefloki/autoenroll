import { useStorage } from "@plasmohq/storage"
import { useEffect, useState } from "react"
import { formatTime } from "~lib/utils/formatTime"

export const EnrollmentCountdown = () => {
  // state
  const [enrollment, , { remove }] = useStorage("enrollment")

  // functions
  const removeEnrollment = () => {
    remove()
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { enroll: false })
    })
  }

  return (
    <div>
      <div className="flex flex-row items-center gap-4 mb-4">
        <p>
          You have an enrollment on{" "}
          <span className="font-bold">{enrollment}</span>
        </p>
        <button
          className="btn btn-outline btn-square btn-sm"
          onClick={removeEnrollment}>
          -
        </button>
      </div>

      <span className="italic text-sm">
        <b>Note* :</b> Do not refresh the page. If you have refreshed the page,
        please remove the enrollment and add it again.
      </span>
    </div>
  )
}
