import { MainModule } from "@/declarations/shared";
import { SweetAlertOptions } from "sweetalert2";
import { ActionContext, Module } from "vuex";
import app from "@/main";
import Swal from 'sweetalert2';
import Cookies from "js-cookie";
import { parseJwt } from "@/lib/utils";
import { PermissionValue } from "@/declarations/permissions";
import store from "./store";

export declare interface MainState {
	sidebarToggle: boolean
}

const swalOptions : SweetAlertOptions = {
	title: "WorkTo Error",
	text: "Some error occurred",
	confirmButtonText: "ok",
	icon: "error"
}

const mainModule : Module<MainState, any> = {
    namespaced: true,
    state: {
		sidebarToggle: null,
	},
    getters: {

	},
    mutations: {
		setSidebarToggle(state) {
			state.sidebarToggle = !state.sidebarToggle;
		}
    },
    actions: {
        async swalFire({state, commit}, payload: SweetAlertOptions){
			console.log(app)
			await Swal.fire(payload);
			return

		},
		extractJwtData(store, field = null) {
			const token = Cookies.get("auth");
			if(!token) return null;
			const parsed = parseJwt(token);
			if(parsed) {
				// eslint-disable-next-line no-debugger
				//debugger;

				if(field) return parsed[field];
				else return parsed;
			}
			else return null;
		},
		async checkPermission({dispatch}, payload: string) : Promise<boolean>{
			const perms = await dispatch("extractJwtData", 'permissions' );

			let r = false;
			if(perms) {
				const pr = perms.map((el: any) => el.slug);
				r = pr.includes(payload);
				// eslint-disable-next-line no-debugger
				//debugger;
			}
			return r;
		},
		async getPermissions({dispatch,rootState}) : Promise<string[]>{
			const authState = rootState.auth;
			let isAuth = authState.isAuthenticated;
			if(!isAuth) {
				isAuth = await store.dispatch("auth/verifyToken");
				if(!isAuth) return [];
			}
			const perms = await dispatch("extractJwtData", 'permissions' );
			return perms.map((el: any) => el.slug);
		},
		async getUserLoggedData({dispatch,rootState}, payload ) : Promise<string[]>{
			const authState = rootState.auth;
			let isAuth = authState.isAuthenticated;
			if(!isAuth) {
				isAuth = await store.dispatch("auth/verifyToken");
				if(!isAuth) return [];
			}
			const user = await dispatch("extractJwtData");
			// eslint-disable-next-line no-debugger
			// debugger;
			return user[payload];
		},
		toggleSidebar({commit, state}, action = "" ){
			if(action !== "") {
				if(action === 'close') commit("setSidebarToggle", false);
				else commit("setSidebarToggle", true);
			}
			else commit("setSidebarToggle");
		}
    }
}

export default mainModule;