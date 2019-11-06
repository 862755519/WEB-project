import request from '@/utils/request'

export function listCard(query) {
    return request({
      url: '/business/list',
      method: 'get',
      params: query
    })
  }
export function listTrade(query) {
    return request({
      url: '/trade/list',
      params: query
    })
  }
  
  export function inserOrUpdate(data) {
    return request({
      url: '/business/insertOrUpdate',
      method: 'post',
      data
    })
  }
  
  export function readCard(query) {
    return request({
      url: '/business/read',
      method: 'get',
      params: query
    })
  }

  export function deleteCard(query) {
    return request({
      url: '/business/delete',
      method: 'get',
      params: query
    })
  }
  