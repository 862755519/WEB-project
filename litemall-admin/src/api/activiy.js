import request from '@/utils/request'

export function listActivity(query) {
  return request({
    url: '/activity/list',
    method: 'get',
    params: query
  })
}
export function listSignIn() {
  return request({
    url: '/signIn/queryAll',
    method: 'get',
  })
}

export function insertOrUpdate(data) {
  return request({
    url: '/activity/insertOrUpdate',
    method: 'post',
    data
  })
}

export function deteleActivity(query) {
  return request({
    url: '/activity/delete',
    method: 'get',
    params:query
  })
}
