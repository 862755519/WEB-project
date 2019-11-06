import request from '@/utils/request'

//查询返利信息
export function listRebate(query) {
  return request({
    url: '/amount/list',
    method: 'get',
    params: query
   
  })
}


