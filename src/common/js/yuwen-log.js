const { yuwenLog } = getApp().globalData;

function setLastFrom(value) {
  yuwenLog.lastfrom = value;
}
function getLastFrom() {
  return yuwenLog.lastfrom;
}
function getAllLog() {
  return yuwenLog;
}
export { setLastFrom, getLastFrom, getAllLog };
