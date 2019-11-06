import request from '@/utils/request'


//查询返利信息
export function listRebate() {
  return request({
    url: '/embmerRebate/list',
    method: 'get',
   
  })
}

//添加返利信息
export function createRebate(data) {
  return request({
    url: '/embmerRebate/update',
    method: 'post',
    data
  })
}

//查询返利信息
export function findRebate(query) {
  return request({
    url: '/embmerRebate/read',
    method: 'get',
    params: query
  })
}
//查询返利信息
export function findRebateSetList(query) {
  return request({
    url: '/rebateSet/query',
    method: 'get',
    params: query
  })
}

