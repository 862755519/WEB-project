import request from '@/utils/request'

export function listTopic(query) {
  return request({
    url: '/litemallcard/list',
    method: 'get',
    params: query
  })
}

export function createTopic(data) {
  return request({
    url: '/litemallcard/save',
    method: 'post',
    data
  })
}

export function readTopic(query) {
  return request({
    url: '/litemallcard/info',
    method: 'get',
    params: query
  })
}

export function updateTopic(data) {
  return request({
    url: '/litemallcard/update',
    method: 'post',
    data
  })
}

export function deleteTopic(data) {
  return request({
    url: '/litemallcard/delete',
    method: 'post',
    data
  })
}
