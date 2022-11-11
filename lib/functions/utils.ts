export const formatTime = (input: string) => {
  const d = new Date()
  const formattedTime = new Date(
    `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${input}`
  )

  return formattedTime
}

export const formatMilitaryTime = (input) => {
  const time = input.slice(0, -2)
  const modifier = input.slice(-2)
  let [hours, minutes] = time.split(":")
  if (hours === "12") {
    hours = "00"
  }
  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12
  }
  return `${hours}:${minutes}`
}

export const convertTimeToNumber = (time) => {
  time = formatMilitaryTime(time)

  const hours = Number(time.split(":")[0])
  const minutes = Number(time.split(":")[1]) / 60
  return hours + minutes
}
