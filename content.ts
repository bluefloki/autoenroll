import { Storage } from "@plasmohq/storage"
import { enroll } from "~lib/functions/enroll"

const storage = new Storage({ area: "sync" })

// global variables
let enrollmentTimout = null

window.addEventListener(
  "PassToBackground",
  async function (evt) {
    // setting the heading
    const heading = evt["detail"]["heading"]
    storage.set("heading", heading)
  },
  false
)

// Enroll Script
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.enroll === true) {
    const etaMs = new Date(request.time).getTime() - Date.now()
    enrollmentTimout = setTimeout(enroll, etaMs)
  } else {
    clearTimeout(enrollmentTimout)
    enrollmentTimout = null
  }
})

export {}
