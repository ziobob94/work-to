import { ActionContext } from "vuex";

const userModule = {
    namespaced: true,
    state: {
        user: null
    },
    getters: {
        getUser: (state: any) => state.user
    },
    mutations: {
        setUser(state: any, payload: any){
            state.user = payload;
        },
    },
    actions: {
        async fetchUser ({ commit }: any ) {
            // Perform asynchronous operation to fetch user data
            // Once the data is retrieved, commit the mutation to set the user
            const user = { name: 'John Doe', email: 'johndoe@example.com' }
            commit('setUser', user)
        },
        async fetchAllUsers ({ commit } : any) {
            // if (admin) 
            const users = null;
            commit('setAllUsers', users);
        },
        async createUser (payload: any) {
            // if (admin)
            const user = payload;
            return user;
        },
        async updateUser (payload: any) {
            // if (admin)
            const user = payload;
            return user;
        },
        async deleteUser (payload: any){
            // if (admin)
            const user = payload;
            return user;
        }
    }
}

export default userModule;