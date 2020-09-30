import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/hi/main?hi=24B21OYFSK1L',
    method: 'get',
    params: query
  })
}

 
