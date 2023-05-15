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
        
        state.isAuthenticated = payload;
    }
  },
  actions: {
    async handleLoginAPI({commit},loginData){
      let logged = null;
      try{ 
          // console.log("[handleLoginAPI] DATA: ", loginData);
          logged = await instance.post("/api/login", loginData );
          if(logged.data.result){
              Cookies.set("auth", logged.data.data, {expires: 1 });
              // console.log("INSTANCE ", instance.defaults.headers.common);
              instance.defaults.headers.common.Authorization = 'Bearer ' + logged.data.data // Replace with your authorization token
              commit("setAuthenticated", true);
          }
      }
      catch(err){
          console.error("[SignupFormComponent] ERROR: ", err);
          // eslint-disable-next-line no-debugger
          //debugger;
          logged = null
      }
      return logged;
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