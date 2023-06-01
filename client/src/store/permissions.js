import { instance } from '@/main';

const permissionsModule = {
	namespaced: true,
	state: {
		permissionsValues: null,
		rolesValues: null
	},
	getters: {
	},
	mutations: {
		setPermissionsValues(state, payload){
			state.permissionsValues = payload;
		},
		setRolesValues(state, payload){
			state.rolesValues = payload;
		}
	},
	actions: {
		async init({dispatch}){
			await dispatch("fetchRoles");
			await dispatch("fetchPermissions");
		},
		async savePermissionsAPI(store, payload){
			let ret = {
				result: false,
				message: "Save permission",
				code: 500
			}
			try{

				ret = await instance.post("/api/admin/permissions", payload);
				
				if(ret.data.result) {
					const d = ret.data;
					d.message = ret.data.message;
					return d.data;
				}
			}
			catch(err){
				console.warn("[permissions.savePermissionsAPI] ERORR: ", err.message);
			}
			return ret;
		},
		async editPermissionAPI(){
			let ret = {
				result: false,
				message: "Save permission",
				code: 500
			}

			try{
				
				ret = await instance.put("/api/admin/permissions", [this.tempPermission]);
				
				if(ret.data.result) {				
					const d = ret.data;
					d.message = ret.data.message;
					return d.data;
				}


			}
			catch(err){
				console.warn("[permissions.editPermissionAPI] ERORR: ", err.message);
			}
		},
		async deletePermissionAPI(){

			let ret = {
				result: false,
				message: "Save permission",
				code: 500
			}
			
			try{                
				ret = await instance.delete(`/api/admin/permissions/${this.tempPermission._id}`);

				if(ret.data.result) {
					const d = ret.data;
					d.message = ret.data.message;
					return d.data;
				}
				
			}
			catch(err){
				console.warn("[permissions.deletePermission] ERROR :", err.message);
			}

			return ret;

		},
		async saveRoleAPI(store, payload){
			let ret = {
				result: false,
				message: "Save permission",
				code: 500
			}

			try{

				ret = await instance.post("/api/admin/roles", payload);

				if(ret.data.result) {
					return ret.data;
				}

			}  
			catch(err){
				console.warn("[permissions.saveRoleAPI] ERROR :", err.message);
			}
			return ret;
		},
		async fetchPermissions({commit}){
			try{
				let ret = {
					result: false,
					message: "Save permission",
					code: 500
				}

				ret = await instance.get("/api/admin/permissions");
				
				if(ret.data.result){
					const d = ret.data;
					commit("setPermissionsValues", d.data);
					d.message = ret.data.message;
					return d.data;
				}
			}
			catch(err){
				console.warn("[permissions.fetchPermissions] ERROR: ", err.message);
			}
			commit("setPermissionsValues", null);
		},
		async fetchRoles({commit}){
			try{
				let ret = {
					result: false,
					message: "Save roles ",
					code: 500

				}
				ret = await instance.get("/api/admin/roles");

				if(ret.data.result){
					const d = ret.data;
					commit("setRolesValues", d.data);
					d.message = ret.data.message;
					return d.data;
				}

				return false;
			}
			catch(err){
				return null;
			}
		}
	}
}

export default permissionsModule;