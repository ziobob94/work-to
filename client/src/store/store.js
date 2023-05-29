/* eslint-disable no-debugger */
import { instance } from '@/main';
import { createStore } from 'vuex';
import Cookies from 'js-cookie';


const store = createStore({
  state: {
    // Initial state
    isAuthenticated: false,
    user: null,
    token: null,
  },
  mutations: {
    // Mutations to modify state
    setAuthenticated(state, payload){
        state.isAuthenticated = payload;
    },
    setUser(state, payload){
        state.user = payload;
    },
    setToken(state, payload){
        state.token = payload;
    }
    
  },
  actions: {
    async handleLoginAPI({commit, dispatch}, payload){
      let logged = null;
      try{ 
          // debugger
          // console.log("[handleLoginAPI] DATA: ", payload);
          logged = await instance.post("/api/login", payload );
          if(logged.headers.authorization){
              dispatch("setAuthCookie", logged.headers.authorization);
              // console.log("INSTANCE ", instance.defaults.headers.common);
              dispatch("setAuthHeader"); // Replace with your authorization token
              commit("setAuthenticated", true);
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

    async handleSignupAPI(store, payload){
      let signed = null;
      try{ 
        debugger
          signed = await instance.post("/api/register", payload );
          return signed;
      }
      catch(err){
          console.error("[SignupFormComponent] ERROR: ", err);
          // eslint-disable-next-line no-debugger
          //debugger;
          return {result: false, message: "Signup Failed", error: err}
      }
    },

    async handleLogoutAPI({dispatch, commit}){
      let logged = null;
      try{ 
        //debugger;
          logged = await instance.get("/api/logout");
          if(logged.data.result){
              dispatch("unsetAuthCookie");
              // console.log("INSTANCE ", instance.defaults.headers.common);
              dispatch("unsetAuthHeader");
              commit("setAuthenticated", false);
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

    async verifyToken ({commit,dispatch}) {

      let isValid = false

      try {

          let authCookie = Cookies.get("auth");

          if(!authCookie) return isValid;

          dispatch("setAuthHeader", authCookie);

          const resp = await instance.get("/api/validate-token");

          if(resp.data.result && resp.headers.authorization) {
            // debugger;
            dispatch("setAuthCookie", resp.headers.authorization);
            dispatch("setAuthHeader", resp.headers.authorization);
          }
          isValid = resp.data.result;

      }
      catch(err){

        console.error(err);

        isValid = false;

      }

      commit("setAuthenticated", isValid);

      return isValid;
    },

    setAuthCookie(store, payload){
      Cookies.set("auth", payload.replace('Bearer ', ''), {expires: 1 });
    },

    unsetAuthCookie(){
      if(Cookies.get("auth")){
        Cookies.remove('auth');
        return true;
      }
      return false;
    },

    setAuthHeader(store, payload = null){
      if(!payload && !Cookies.get("auth")) return false;
      
      const cookieToken = (payload) ? payload : Cookies.get("auth");
      
      instance.defaults.headers.common.Authorization = 'Bearer ' + cookieToken.replace('Bearer ', '');
      
      return true;
    },

    unsetAuthHeader(){
      if(instance?.defaults?.headers?.common?.Authorization) {
        delete instance.defaults.headers.common.Authorization;
        return true;
      }
      return false;
    }
  },
  
  getters: {

    // Getters to compute derived state
    getAuthenticationStatus(state){
        return state.isAuthenticated;
    },

    getUser(state){
        return state.user;
    },

    getToken(state){
      //TODO: implementare estrazione dati da JWT
      return state.token;
    }
  }
});

export default store;