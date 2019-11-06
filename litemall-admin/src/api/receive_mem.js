import request from '@/utils/request'

export function listCouponDetails(query) {
  return request({
    url: '/couponDetails/list',
    method: 'get',
    params: query
  })
}
