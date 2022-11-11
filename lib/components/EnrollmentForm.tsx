import { useStorage } from "@plasmohq/storage"
import { useForm } from "react-hook-form"
import { formatTime } from "~lib/functions/utils"
import type { ClassTimings } from "~lib/type"
import { TimeClashes } from "./TimeClashes"

export const EnrollmentForm = () => {
  // state
  const [enrollment, setEnrollment] = useStorage("enrollment")
  const [clashes] = useStorage("clashes")

  // functions
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({})
  const onSubmit = (data) => {
    if (clashes == undefined) {
      setEnrollment(formatTime(data.time).toString())
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { enroll: true, time: formatTime(data.time).toString() }
          // function (response) {
          //   console.log(response.farewell)
          // }
        )
      })
    }
  }

  return (
    <div>
      <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label htmlFor="time" className="font-bold">
            Enrollment Start Time
          </label>
          <div className="mt-2 flex flex-row items-center w-full gap-2">
            <input
              required
              type="time"
              className="input input-bordered text-lg"
              {...register("time", { required: true })}
            />
          </div>
        </div>
        <input
          type="submit"
          value="Add Enrollment"
          className="btn mt-4 btn-primary"
          disabled={clashes !== undefined}
        />
      </form>

      <TimeClashes />
    </div>
  )
}
