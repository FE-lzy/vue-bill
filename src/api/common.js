import request from '@/utils/request'

export function queryData(urlApi, data, method) {
  return request({
    url: urlApi,
    method: method,
    data: data
  })
}
