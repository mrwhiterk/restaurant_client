export const setFlash = function (showErr, errMessage) {
  console.log(showErr, errMessage)
  console.log('hit')
  console.log(this)
  this.setState({ showErr, errMessage }, () => console.log(this.state))
}