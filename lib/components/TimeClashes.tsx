import { useStorage } from "@plasmohq/storage"
import { FiCheck } from "react-icons/fi"
import type { ClassTimings } from "~lib/type"

export const TimeClashes = () => {
  const [clashes] = useStorage<ClassTimings[]>("clashes")

  if (clashes == undefined)
    return (
      <p className="flex flex-row items-center gap-4">
        <span>No Time Clashes Found</span>
        <FiCheck className="text-success" size={24} />
      </p>
    )
  else
    return (
      <div>
        <h3 className="mb-2">The following courses have time clashes:</h3>
        <ul className="pb-2">
          {clashes.map((course) => (
            <li className="py-2">
              {course.class}{" "}
              <span className="font-semibold">
                {course.schedule.timingsString}
              </span>
            </li>
          ))}
        </ul>
        <span className="italic text-sm">
          <b>Note* :</b> Please refresh the page if you have removed courses
          from your cart.
        </span>
      </div>
    )
}
