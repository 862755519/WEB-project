import request from '@/utils/request'


//查询返利信息
export function listRebate() {
  return request({
    url: '/goodRebate/list',
    method: 'get',
   
  })
}

//添加返利信息
export function createRebate(data) {
  return request({
    url: '/goodRebate/update',
    method: 'post',
    data
  })
}

//查询返利信息
export function findRebate(query) {
  return request({
    url: '/goodRebate/read',
    method: 'get',
    params: query
  })
}

