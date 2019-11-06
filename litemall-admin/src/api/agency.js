import request from '@/utils/request'


//查询返利信息
export function listRebate() {
  return request({
    url: '/agency/list',
    method: 'get',
   
  })
}

//查询会员信息
export function listUserName() {
  return request({
    url: '/agency/queryUserName',
    method: 'get',
   
  })
}

//添加返利信息
export function createRebate(data) {
  return request({
    url: '/agency/inserOrUpdate',
    method: 'post',
    data
  })
}

//查询返利信息
export function findRebate(query) {
  return request({
    url: '/agency/read',
    method: 'get',
    params: query
  })
}

