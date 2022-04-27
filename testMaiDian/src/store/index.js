import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            loading: false,
            firstEnter: true
        };
    },
    mutations: {
        changeLoading(state, data) {
            state.loading = data.loading;
        },
        setFirstEnter(state, data) {
            state.firstEnter = data.enter;
        }
    }
});

export default store;
