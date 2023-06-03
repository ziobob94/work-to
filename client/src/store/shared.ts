import { SharedModule } from "@/declarations/shared";
import { SweetAlertOptions } from "sweetalert2";
import { ActionContext, Module } from "vuex";
import app from "@/main";
import Swal from 'sweetalert2';


export declare interface SharedState {
}

const swalOptions : SweetAlertOptions = {
	title: "WorkTo Error",
	text: "Some error occurred",
	confirmButtonText: "ok",
	icon: "error"
}

const sharedModule : Module<SharedState, any> = {
    namespaced: true,
    state: {
	},
    getters: {

	},
    mutations: {
    },
    actions: {
        async swalFire({state, commit}, payload: SweetAlertOptions){
			console.log(app)
			await Swal.fire(payload);
			return
			// eslint-disable-next-line no-debugger

		}
    }
}

export default sharedModule;