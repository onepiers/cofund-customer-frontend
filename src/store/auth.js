import {login} from '../api/access'

export function auth(store) {
    store.on('@init', () => ({token: null}))

    store.on('auth/login', (state, code) => {
        login(code).then((token) => {
            store.dispatch('auth/setToken', token)
        });
    })

    store.on('auth/setToken', (state, token) => {
        return {...state, token}
    })
}