/* eslint-disable no-debugger */
import { instance } from '@/main';
import { createStore } from 'vuex';
import Cookies from 'js-cookie';


const store = createStore({
  state: {
    // Initial state
    isAuthenticated: false
  },
  mutations: {
    // Mutations to modify state
    setAuthenticated(state, payload){
        
        //debugger;
        state.isAuthenticated = payload;
    }
  },
  actions: {
    // Actions to perform asynchronous operations
    // eslint-disable-next-line no-unused-vars
    async handleLoginAPI({state,commit},loginData){

      try{ 
          // console.log("[handleLoginAPI] DATA: ", loginData);
          const logged = await instance.post("/api/login", loginData );
          if(logged.data.result){
              Cookies.set("auth", logged.data.data, {expires: 1 });
              // console.log("INSTANCE ", instance.defaults.headers.common);
              instance.defaults.headers.common.Authorization = 'Bearer ' + logged.data.data // Replace with your authorization token
              commit("setAuthenticated", true)
          }
          return logged;
          
      }
      catch(err){
          console.error("[SignupFormComponent] ERROR: ", err);
          // eslint-disable-next-line no-debugger
          //debugger;
          return 

      }
  },

  },
  getters: {
    // Getters to compute derived state
    getAuthenticationStatus(state){
        return state.isAuthenticated;
    }
  }
});

export default store;