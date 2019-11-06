import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function fetchCardList(query) {
  return request({
    url: '/bindCard/list',
    method: 'get',
    params: query
  })
}

export function listAddress(query) {
  return request({
    url: '/address/list',
    method: 'get',
    params: query
  })
}

export function listCollect(query) {
  return request({
    url: '/collect/list',
    method: 'get',
    params: query
  })
}

export function listFeedback(query) {
  return request({
    url: '/feedback/list',
    method: 'get',
    params: query
  })
}

export function listFootprint(query) {
  return request({
    url: '/footprint/list',
    method: 'get',
    params: query
  })
}

export function listHistory(query) {
  return request({
    url: '/history/list',
    method: 'get',
    params: query
  })
}
export function tops() {
  return request({
    url: '/user/tops',
    method: 'get',
    params: ''
  })
}
export function next(query) {
  return request({
    url: '/user/next',
    method: 'get',
    params: query
  })
}
export function readUser(query) {
  return request({
    url: '/user/read',
    method: 'get',
    params: query
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}
///////空升

export function upCause(query) {
  return request({
    url: '/xcxUser/upCause',
    method: 'get',
    params:query
  })
}

export function upCommerceChamber(query) {
  return request({
    url: '/xcxUser/upCommerceChamber',
    method: 'get',
    params:query
  })
}

export function upOperationCenter(query) {
  return request({
    url: '/xcxUser/upOperationCenter',
    method: 'get',
    params:query
  })
}
export function giveQuota(query) {
  return request({
    url: '/xcxUser/giveQuota',
    method: 'get',
    params:query
  })
}
export function findByMobie(query) {
  return request({
    url: '/xcxUser/findByMobie',
    method: 'get',
    params:query
  })
}


