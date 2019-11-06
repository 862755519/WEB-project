import request from '@/utils/request'

export function listCardVip(query) {
  return request({
    url: '/cardVip/list',
    method: 'get',
    params: query
  })
}

export function insertOrUpdate(data) {
  return request({
    url: '/cardVip/insertOrUpdate',
    method: 'post',
    data
  })
}

export function deteleCardVip(query) {
  return request({
    url: '/cardVip/delete',
    method: 'get',
    params:query
  })
}