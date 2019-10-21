import request from '@/utils/request1'

export function queryData(urlApi,method,data) {
  return request({
    url: urlApi,
    method: method,
    data:data
  })
}
