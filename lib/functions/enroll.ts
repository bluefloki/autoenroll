import { Storage } from "@plasmohq/storage"

const storage = new Storage({ area: "sync" })

export const enroll = async () => {
  const iframe: HTMLIFrameElement = document.querySelector(`iframe`)
  const doc = iframe.contentDocument

  const enrollButton: HTMLInputElement = doc.querySelector(
    `input[value="Enroll"]`
  )
  enrollButton.click()
  // Click the finish enrolling button in the injected helper, which runs on every page update

  storage.remove("enrollment")
}
