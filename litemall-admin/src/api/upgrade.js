import request from '@/utils/request'

export function upgradeList(query) {
  return request({
    url: '/promoteRebate/list',
    method: 'get',
    params: query
  })
}

export function upgradeCreate(data) {
  return request({
    url: '/promoteRebate/create',
    method: 'post',
    data
  })
}

export function upgradeEdit(data) {
  return request({
    url: '/promoteRebate/update',
    method: 'post',
    data
  })
}

export function upgradeRead(query) {
  return request({
    url: '/promoteRebate/read',
    method: 'get',
    params: query
  })
}