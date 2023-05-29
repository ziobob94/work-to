/* eslint-disable no-debugger */
import { instance } from '@/main';
import { createStore } from 'vuex';
import Cookies from 'js-cookie';


const store = createStore({
  state: {
    // Initial state
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    // Mutations to modify state
    setAuthenticated(state, payload){
        
        state.isAuthenticated = payload;
    },
    setUser(state, payload){
        
        state.user = payload;
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
              commit("setUser", logged.data.data);
          }
          return logged.data;

      }
      catch(err){
          console.error("[SignupFormComponent] ERROR: ", err);
          // eslint-disable-next-line no-debugger
          //debugger;
          return {result: false, message: "Login Failed", error: err}
      }
    },
    async handleSignupAPI(signupData){
      let signed = null;
      try{ 
          signed = instance.post("/api/register", signupData );

          return !!signed.data;

      }
      catch(err){
          console.error("[SignupFormComponent] ERROR: ", err);
          // eslint-disable-next-line no-debugger
          //debugger;
          return {result: false, message: "Signup Failed", error: err}
      }
    },

    async handleLogoutAPI({commit}){
      let logged = null;
      try{ 
        //debugger;
          logged = await instance.get("/api/logout");
          if(logged.data.result){
              Cookies.remove('auth');
            // console.log("INSTANCE ", instance.defaults.headers.common);
              delete instance.defaults.headers.common.Authorization
              commit("setAuthenticated", false);
              commit("setUser", null);
          }
          return logged;

      }
      catch(err){
          console.error("[handleLogoutAPI] ERROR: ", err);
          // eslint-disable-next-line no-debugger
          //debugger;
          return {result: false, message: "Logout Failed", error: err}
      }
    },
    async verifyToken ({commit}) {
      let isValid = false
      try {
          const cookieToken = Cookies.get("auth");
          instance.defaults.headers.common.Authorization = 'Bearer ' + cookieToken;
          const resp = await instance.get("/api/validate-token");
          if(resp.data.result) {
            commit("setUser", resp.data.data);
          }
          isValid = resp.data.result;
      }
      catch(err){
        console.error(err)
        isValid = false;
      }
      commit("setAuthenticated", isValid)
      if(!isValid) commit("setUser", null);
      return isValid;
  }
  },
  getters: {
    // Getters to compute derived state
    getAuthenticationStatus(state){
        return state.isAuthenticated;
    },
    getUser(state){
        return state.user;
    }
  }
});

export default store;