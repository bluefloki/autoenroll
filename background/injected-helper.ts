const windowChanger = async () => {
  // Initial DOM elements
  const iframe: HTMLIFrameElement = document.querySelector(`iframe`)
  const doc = iframe.contentDocument
  const heading = doc.querySelector(`span[role="heading"]`).textContent

  // variables
  let courses: HTMLAnchorElement[]

  // functions
  const selectCourses = () => {
    // check all the courses
    const checkboxes: HTMLInputElement[] = Array.from(
      doc.querySelectorAll(`input[type="checkbox"`)
    )
    const hiddenInputs: HTMLInputElement[] = Array.from(
      doc.querySelectorAll(`input[value="N"`)
    )
    checkboxes.map((el) => (el.checked = true))
    hiddenInputs.map((el) => (el.value = "Y"))
  }
  const getCourseNames = () =>
    (courses = Array.from(
      document.querySelectorAll(`span[id^="P_CLASS_NAME"]`)
    ))

  if (heading == "Shopping Cart") {
    selectCourses()
    getCourseNames()

    // get finish enrollment button
    let finishEnrollButton: HTMLInputElement = doc.querySelector(
      `input[value="Finish Enrolling"]`
    )

    // check if we are on the second stage of enrollment
    if (finishEnrollButton !== null) finishEnrollButton.click()
  }

  let event = new CustomEvent("PassToBackground", {
    detail: { heading, courses }
  })
  window.dispatchEvent(event)
}

export default windowChanger
