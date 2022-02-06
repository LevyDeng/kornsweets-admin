const { default: Axios } = require("axios")

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      const query = config.query
      var code = query['code']
      Axios.post(
        'https://gutian-uat.portal.tencentciam.com/oauth2/token',
        {
          client_id: 'M2IyOGVhN2E5ZDViNDA4OGJiYzZkMzhkZDNkMjUxOTE',
          client_secret: 'StAAtc25FRDl0hFMT/12D899IgkbCHyI',
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: '/'
        }
      ).then(
        response => {
          this.$store.commit('SET_TOKEN', response.data.access_token)
          this.$store.commit('SET_TOKEN', response.data.access_token)
        }
      ).catch(
        error => {
          console.log(error)
        }
      )

      // mock error
      if (!this.$store.state.token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: this.$store.state.token
      }
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
