import request from '@/utils/request'


export function moneyList(query) {
  return request({
    url: '/cast/list',
    method: 'get',
    params: query
  })
}

export function moneyUpdate(data) {
  return request({
    url: '/cast/update',
    method: 'post',
    data
  })
}
// export function text() {
//   return request({
//     url: '/cast/rate',
//     method: 'get'
    
//   })
// }