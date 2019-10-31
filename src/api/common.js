import request from '@/utils/request1'

export function queryData(urlApi,data,method) {
  return request({
    url: urlApi,
    method: method,
    data:data
  })
}
