import { Storage } from "@plasmohq/storage"
import { enroll } from "~lib/functions/enroll"
import { getCourses } from "~lib/functions/getCourses"
import { getTimeClashes } from "~lib/functions/getTimeClashes"

const storage = new Storage({ area: "sync" })

// global variables
let enrollmentTimout = null

window.addEventListener(
  "PassToBackground",
  async function (evt) {
    // setting the heading
    const heading = evt["detail"]["heading"]
    storage.set("heading", heading)

    // getting course details
    const classTimings = getCourses()

    // detect time clashes
    const clashes = getTimeClashes(classTimings)

    // set time clashes in storage
    if (clashes.length > 0) storage.set("clashes", clashes)
    else storage.remove("clashes")
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
