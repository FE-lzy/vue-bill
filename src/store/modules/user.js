import { login, logout, getInfo } from '@/api/user'
import { queryData } from '@/api/common'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      queryData('/user/login', userInfo, 'POST').then(res => {
        console.log(res)
        if (res.code == 0) {
          console.log(res)
          commit('SET_TOKEN', res.data.uToken)
          setToken(res.data.uToken)
          localStorage.setItem('uToken',res.data.uToke)
          localStorage.setItem('name', res.data.user.username)
          localStorage.setItem('userId', res.data.user.id)
          localStorage.setItem('dwbm', res.data.user.dwbm)
          localStorage.setItem('lsToken', res.data.token)
          resolve()
        } else {
          reject(res.message)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const uid = localStorage.getItem('userId')
      console.log(uid)

      queryData('/user/userInfo', { id: uid }, 'POST').then(res => {
        console.log(res)
        var dataC = {
          introduction: 'I am a super administrator',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          name: res.data.name,
          roles: res.data.roles
        }
        const { name, avatar, introduction, roles } = dataC
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)

        resolve(dataC)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      localStorage.removeItem('uToken')   
      localStorage.removeItem('name')     
      localStorage.removeItem('userid')
      localStorage.removeItem('dwbm')
      localStorage.removeItem('lsToken')
      removeToken()
      resetRouter()
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
