/*

 gridsome-monetization
 * Web monetization plugin for Gridsome

 Documentation in README.md
 MIT License

 (c) 2020 Peyton McGinnis (sergix) <hello@sergix.dev>

*/

export default function (Vue, options, context) {
  const $monetization = {}

  const global = options.global === undefined || options.global ? true : false

  if (global) {
    context.head.meta.push({
      name: "monetization",
      content: options.paymentPointer,
    })
  }

  if (!context.isClient) return

  const monetizationEnabled = document.monetization ? true : false

  const getMonetizationTag = () =>
    document.querySelector('meta[name="monetization"]')

  const addMonetizationTag = () => {
    const meta = document.createElement("meta")
    meta.setAttribute("name", "monetization")
    meta.setAttribute("content", options.paymentPointer)
    document.getElementsByTagName("head")[0].appendChild(meta)

    // return the DOM node
    return getMonetizationTag()
  }

  // object modifiers

  $monetization.enable = () =>
    !getMonetizationTag() ? addMonetizationTag() : false

  $monetization.disable = () =>
    getMonetizationTag() ? getMonetizationTag().remove() : false

  $monetization.getObject = () =>
    monetizationEnabled ? document.monetization : false

  // state

  $monetization.isSupported = () => monetizationEnabled

  $monetization.isEnabled = () => (getMonetizationTag() ? true : false)

  $monetization.isDisabled = () => (!getMonetizationTag() ? true : false)

  $monetization.isStarted = () =>
    monetizationEnabled ? document.monetization.state === "started" : false

  $monetization.isPending = () =>
    monetizationEnabled ? document.monetization.state === "pending" : false

  $monetization.isStopped = () =>
    monetizationEnabled ? document.monetization.state === "stopped" : false

  $monetization.getState = () =>
    monetizationEnabled ? document.monetization.state : false

  $monetization.getEventStateString = (event) => {
    const state = new String(event.type).substring(
      "monetization".length,
      event.type.length
    )
    if (state === "stop") return "stopped"
    if (state === "start") return "started"
    return state
  }

  // event handlers

  $monetization.onStart = (handler) =>
    monetizationEnabled
      ? document.monetization.addEventListener("monetizationstart", handler)
      : false

  $monetization.onPending = (handler) =>
    monetizationEnabled
      ? document.monetization.addEventListener("monetizationpending", handler)
      : false

  $monetization.onStop = (handler) =>
    monetizationEnabled
      ? document.monetization.addEventListener("monetizationstop", handler)
      : false

  $monetization.onProgressChange = (handler) =>
    monetizationEnabled
      ? document.monetization.addEventListener("monetizationprogress", handler)
      : false

  $monetization.onStateChange = (handler) =>
    $monetization.onPending(handler) ||
    $monetization.onStart(handler) ||
    $monetization.onStop(handler)

  Vue.prototype.$monetization = $monetization
}
