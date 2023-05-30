const userModule = {
    namespaced: true,
    state: {
        user: null
    },
    getters: {
        getUser: state => state.user
    },
    mutations: {
        setUser(state, payload){
            state.user = payload;
        },
    },
    actions: {
        async fetchUser ({ commit }) {
            // Perform asynchronous operation to fetch user data
            // Once the data is retrieved, commit the mutation to set the user
            const user = { name: 'John Doe', email: 'johndoe@example.com' }
            commit('setUser', user)
        },
        async fetchAllUsers ({ commit }) {
            // if (admin) 
            const users = null;
            commit('setAllUsers', users);
        },
        async createUser (payload) {
            // if (admin)
            const user = payload;
            return user;
        },
        async updateUser (payload) {
            // if (admin)
            const user = payload;
            return user;
        },
        async deleteUser (payload){
            // if (admin)
            const user = payload;
            return user;
        }
    }
}

export default userModule;