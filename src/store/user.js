import Cookie from 'js-cookie'


export default {
    state: {

        token: null,
        permissions:['user.query','user.add']

    },
    mutations: {
        getToken(state) {
            let token = Cookie.get('token')
            if (token) {
                state.token = token
            }
        },
        setToken(state,val){
            state.token=val
            Cookie.set('token',val)
        },
        clearToken(state){
            state.token=null
            Cookie.remove("token")
        }

    },
    actions: {},

}