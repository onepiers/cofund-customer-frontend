import {getEntrepreneur, getAmount, updateEntrepreneur} from "../api/access";

export function entrepreneur(store) {
    store.on('@init', () => ({entrepreneur: null, amount: {}}))

    store.on('entrepreneur/load', (state, code) => {
        getEntrepreneur(state.token).then((data) => {
            store.dispatch('entrepreneur/loaded', data)
            store.dispatch('entrepreneur/getAmount', data.googlePlaceId)
        });
    })

    store.on('entrepreneur/getAmount', (state, id) => {
        getAmount(id, state.token).then((data) => {
            store.dispatch('entrepreneur/setAmount', data)
        });
    })

    store.on('entrepreneur/update', (state, data) => {
        updateEntrepreneur(data.id, state.token, data).then((resp) => {
            store.dispatch('entrepreneur/loaded', resp)
        });
    })

    store.on('entrepreneur/loaded', (state, entrepreneur) => {
        return {...state, entrepreneur}
    })

    store.on('entrepreneur/setAmount', (state, amount) => {
        return {...state, amount}
    })

}