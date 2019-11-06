import request from '@/utils/request'

export function listGoods(query) {
  return request({
    url: '/goods/list',
    method: 'get',
    params: query
  })
}

export function deleteGoods(data) {
  return request({
    url: '/goods/delete',
    method: 'post',
    data
  })
}

export function publishGoods(data) {
  return request({
    url: '/goods/create',
    method: 'post',
    data
  })
}

export function detailGoods(id) {
  return request({
    url: '/goods/detail',
    method: 'get',
    params: { id }
  })
}

export function editGoods(data) {
  return request({
    url: '/goods/update',
    method: 'post',
    data
  })
}

export function listCatAndBrand() {
  return request({
    url: '/goods/catAndBrand',
    method: 'get'
  })
}

export function householdInfo(data) {
  return request({
    url: '/commodity/list',
    method: 'get',
    params: data
  })
}

export function householdAdd(data) {
  return request({
    url: '/commodity/createOrUpdate',
    method: 'post',
    data
  })
}

export function householdDelete(data) {
  return request({
    url: '/commodity/delete',
    method: 'get',
    params:data
  })
}

export function householdRaed(data) {
  return request({
    url: '/commodity/read',
    method: 'get',
    params:data
  })
}

export function receiveList(data) {
  return request({
    url: '/receive/list',
    method: 'get',
    params:data
  })
}

export function receiveUpdate(data) {
  return request({
    url: '/receive/update',
    method: 'post',
    data
  })
}


export function recordList(data) {
  return request({
    url: '/shopkeeper/list',
    method: 'get',
    params:data
  })
}

export function readList(data) {
  return request({
    url: '/shopkeeper/read',
    method: 'get',
    params:data
  })
}

export function receiveInfo(data) {
  return request({
    url: '/receive/read',
    method: 'get',
    params:data
  })
}

export function recordUpdate(data) {
  return request({
    url: '/shopkeeper/update',
    method: 'post',
    data
  })
}
