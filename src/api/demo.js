import httpRequest from '@/utils/request'

export const apiAuthLogin = async (data) => {
  return httpRequest({
    url: '/auth/login',
    method: 'POST',
    data: data
  })
}

export const apiGetStaffInfo = async (params) => {
  return httpRequest({
    url: '/auth/staff-info',
    method: 'GET',
    params: params
  })
}

export const apiAuthLogout = async () => {
  return httpRequest({
    url: '/auth/logout',
    method: 'POST'
  })
}
