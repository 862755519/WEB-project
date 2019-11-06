import request from '@/utils/request'

export function info(query) {
  return request({
    url: '/dashboard',
    method: 'get',
    params: query
  })
}
export function infoCount() {
  return request({
    url: '/dashboard/count',
    method: 'get',
  })
}
