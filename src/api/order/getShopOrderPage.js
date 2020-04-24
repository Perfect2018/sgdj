import api from '../../config/api'

let proxyId = sessionStorage.getItem('proxyId')

export function getList(currentPage, order, cus, state) {
  let params = {
    'pageNum': currentPage,
    'orderNo': order,
    'username': '',
    'shopName': cus,
    'isOutorder': state,
    'proxyId': proxyId
  }
  return api._post('/bcars-fresh/order/orderList', params);
}
