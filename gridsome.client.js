export default function (Vue, options, context) {
  const $monetization = {}

  const monetizationEnabled = document.monetization ? true : false

  const global = options.global === undefined || options.global ? true : false

  const getMonetizationTag = () =>
    document.querySelector('meta[name="monetization"]')

  const addMonetizationTag = () =>
    context.head.meta.push({
      name: "monetization",
      content: options.paymentPointer,
    })

  if (!context.isClient) return

  if (global) {
    addMonetizationTag()
  }

  // object modifiers

  $monetization.enable = () =>
    !getMonetizationTag() ? addMonetizationTag() : false

  $monetization.disable = () =>
    getMonetizationTag() ? getMonetizationTag().remove() : false

  $monetization.getObject = () =>
    monetizationEnabled ? document.monetization : false

  // state

  $monetization.isEnabled = () => monetizationEnabled

  $monetization.isStarted = () =>
    monetizationEnabled ? document.monetization.state === "started" : false

  $monetization.isPending = () =>
    monetizationEnabled ? document.monetization.state === "pending" : false

  $monetization.isStopped = () =>
    monetizationEnabled ? document.monetization.state === "stopped" : false

  $monetization.getState = () =>
    monetizationEnabled ? document.monetization.state : false

  // event handlers

  $monetization.onPending = (handler) =>
    monetizationEnabled
      ? document.monetization.addEventListener("monetizationpending", handler)
      : false

  $monetization.onStart = (handler) =>
    monetizationEnabled
      ? document.monetization.addEventListener("monetizationstart", handler)
      : false

  $monetization.onStop = (handler) =>
    monetizationEnabled
      ? document.monetization.addEventListener("monetizationstop", handler)
      : false

  $monetization.onProgressChange = (handler) =>
    monetizationEnabled
      ? document.monetization.addEventListener("monetizationprogress", handler)
      : false

  Vue.prototype.$monetization = $monetization
}
