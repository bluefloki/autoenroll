import windowChanger from "./injected-helper"

const inject = async (tabId) => {
  chrome.scripting.executeScript(
    {
      target: {
        tabId
      },
      world: "MAIN", // MAIN in order to access the window object
      func: windowChanger
    }
    // () => {
    //   console.log("Background script got callback after injection")
    // }
  )
}

chrome.tabs.onUpdated.addListener((e) => {
  inject(e)
})
