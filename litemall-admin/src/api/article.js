import request from '@/utils/request'

export function listArticle(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/updateSate',
    method: 'post',
    data
  })
}

