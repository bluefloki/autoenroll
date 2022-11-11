import type { ClassTimings } from "~lib/type"
import { convertTimeToNumber } from "./utils"

// tables[1].rows[1].cells[6].querySelector("img").alt

export const getCourses = () => {
  const iframe: HTMLIFrameElement = document.querySelector(`iframe`)
  const doc = iframe.contentDocument

  // first table is shopping cart, second is class schedule
  const tables: NodeListOf<HTMLTableElement> =
    doc.querySelectorAll(`table.PSLEVEL1GRID`)

  // Getting valid table headings
  const headings = {
    cart: tables[0].rows[0],
    schedule: tables[1] !== undefined ? tables[1].rows[0] : null
  }
  const validHeadings = {
    cart: getValidHeadings(headings.cart.cells),
    schedule:
      tables[1] !== undefined ? getValidHeadings(headings.schedule.cells) : null
  }

  const classTimings: ClassTimings[] = [
    ...getClassTimings(tables[0], validHeadings.cart)
  ]
  if (tables[1] !== undefined)
    classTimings.push(...getClassTimings(tables[1], validHeadings.schedule))

  return classTimings
}

const getValidHeadings = (input) => {
  const headings = Array.from(input)
  let validHeadings = []
  headings.map((el: HTMLTableCellElement, idx) => {
    if (el.innerText === "Class" || el.innerText === "Days/Times")
      validHeadings.push(idx)
  })
  return validHeadings
}

const getClassTimings = (table: HTMLTableElement, headings: number[]) => {
  try {
    let classes = Array.from(table.rows).slice(1)

    // removing dropped classes
    if (headings[0] == 0) {
      for (const [i, c] of classes.entries()) {
        if (c.cells[6].querySelector("img").alt == "Dropped")
          classes.splice(i, 1)
      }
    }

    const classDetails = classes.map((el) => {
      let details: HTMLTableCellElement[] = Array.from(el.cells).filter(
        (el, i) => headings.includes(i)
      )

      let [days, ...timings] = details[1].innerText.split(" ")

      return {
        class: details[0].innerText,
        schedule: {
          days:
            days.length > 2
              ? [days.substring(0, 2), days.substring(2, 5)]
              : [days.substring(0, 2)],
          timings: {
            start: convertTimeToNumber(timings[0]),
            end: convertTimeToNumber(timings[2])
          },
          timingsString: timings.join("")
        }
      }
    })

    return classDetails
  } catch (error) {
    if (error) return []
  }
}
