import request from '@/utils/request'

export function listsignIn(query) {
  return request({
    url: '/signIn/list',
    method: 'get',
    params: query
  })
}
export function listCoupon() {
  return request({
    url: '/xcxCoupon/queryAll',
    method: 'get',
  })
}

export function insertOrUpdate(data) {
  return request({
    url: '/signIn/insertOrUpdate',
    method: 'post',
    data
  })
}

export function deteleSignIn(query) {
  return request({
    url: '/signIn/delete',
    method: 'get',
    params:query
  })
}
