import api from '../../config/api'

let proxyId = sessionStorage.getItem("proxyId");
const getData = () => {
  let params = {'proxyId': proxyId}
  return api._post('/bcars-fresh/analysisReport/selectByAll', params)
}
const getCount = () => {
  let params = {'proxyId': proxyId}
  return api._post('/bcars-fresh/analysisReport/businessStatistics', params);
}

const getUserCount = () => {
  let params = {'proxyId': proxyId}
  return api._post('/bcars-fresh/analysisReport/userStatisticsChart', params);
}

export default {
  getData,
  getCount,
  getUserCount
}
