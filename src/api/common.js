import request from '@/utils/request1'

export function queryData(urlApi) {
  return request({
    url: urlApi,
    method: 'get'
  })
}