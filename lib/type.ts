export type ClassTimings = {
  class: string
  schedule: {
    days: string[]
    timings: {
      start: number
      end: number
    }
    timingsString?: string
  }
}
