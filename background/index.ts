import windowChanger from "./injected-helper"
import ExtPay from "extpay"

// Init ExtPay.js
const extpay = ExtPay("autoenroll")
extpay.startBackground()

// extpay.getUser().then((user) => console.log(user))

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
