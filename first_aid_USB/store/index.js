import { createStore } from "vuex";

const store = createStore({
    state: {
        tagUtil: null,
    },
    mutations: {
        setTagUtil(state, newTagUtil) {
            state.tagUtil = newTagUtil;
        }
    }
})
export default store;