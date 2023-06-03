/* eslint-disable no-debugger */
import { instance } from '@/main';
import Cookies from 'js-cookie';


const authModule = {
    namespaced: true,
    state: {
        // Initial state
        isAuthenticated: false,
        token: null,
    },
    mutations: {
        // Mutations to modify state
        setAuthenticated(state: any, payload: any){
            state.isAuthenticated = payload;
        },

        setToken(state: any, payload: any){
            state.token = payload;
        }
        
    },
    actions: {
        async handleLoginAPI({commit, dispatch}: any, payload: any){
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
        
        async handleSignupAPI(store: any, payload: any){
            let signed = null;
            try{ 
                debugger
                signed = await instance.post("/api/register", payload );
                return signed.data;
            }
            catch(err){
                console.error("[SignupFormComponent] ERROR: ", err);
                // eslint-disable-next-line no-debugger
                //debugger;
                return {result: false, message: "Signup Failed", error: err}
            }
        },
        
        async handleLogoutAPI({dispatch, commit}: any){
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

        async callVerifyAPI(){
            return await instance.get("/api/validate-token");
        },
        async verifyToken ({commit,dispatch}: any) {
            
            let isValid = false
            
            try {
                
                const authCookie = Cookies.get("auth");
                
                if(!authCookie) return isValid;
                
                dispatch("setAuthHeader", authCookie);
                
                const resp = await dispatch("callVerifyAPI");
                
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
        
        setAuthCookie(store: any, payload: any){
            Cookies.set("auth", payload.replace('Bearer ', ''), {expires: 1 });
        },        
        unsetAuthCookie(){
            if(Cookies.get("auth")){
                Cookies.remove('auth');
                return true;
            }
            return false;
        },
        
        setAuthHeader(store: any, payload = null){
			const cookieAuth = Cookies.get("auth");
            if(!payload && !cookieAuth) return false;
            
            const cookieToken = (payload) ? payload : Cookies.get("auth");
            
			if(!cookieToken) return false;

            instance.defaults.headers.common.Authorization = 'Bearer ' + cookieToken.replace('Bearer ', '');
            
            return true;
        },
        
        unsetAuthHeader(){
            if(instance?.defaults?.headers?.common?.Authorization) {
                delete instance.defaults.headers.common.Authorization;
                return true;
            }
            return false;
        },
        async getTokenData({dispatch}: any){
            try { 
                const validate = await dispatch("callVerifyToken");
                if(validate.headers.authorization) {
                    // EXTRACT DATA FROM JWT
                    
                }
            }
            catch(err) {
                console.warn("[store.getTokenData] ERROR: ", err);
                return {result: false, message: "Get data by token failed"};
            }
            
        }
    },
    getters: {
        // Getters to compute derived state
        getAuthenticationStatus(state: any){
            return state.isAuthenticated;
        }
    }
};

export default authModule;