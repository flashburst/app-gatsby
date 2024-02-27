const React = require("react")
const { RootElementWrapper } = require("./src/wrap-root-element")

// Logs when the client route changes
exports.onRouteUpdate = ({ location, prevLocation }) => {
  console.log("new pathname", location.pathname)
  console.log("old pathname", prevLocation ? prevLocation.pathname : null)
}

// Wraps every page in a component
exports.wrapRootElement = ({ element }) => {
  return <RootElementWrapper>{element}</RootElementWrapper>
}