import request from '@/utils/request'

export function listGoods() {
  return request({
    url: '/goods/queryList',
    method: 'get',
  })
}

export function  listCoupon(query) {
  return request({
    url: '/xcxCoupon/list',
    method: 'get',
    params: query
  })
}

export function readCoupon(query) {
  return request({
    url: '/xcxCoupon/read',
    method: 'POST',
    params: query
  })
}

export function insertOrUpdate(data) {
  return request({
    url: '/xcxCoupon/insertOrUpdate',
    method: 'post',
    data
  })
}

export function deletCoupon(query) {
  return request({
    url: '/xcxCoupon/delete',
    method: 'get',
    params: query
  })
}
