import { instance } from '@/main';

const permissionsModule = {
	namespaced: true,
	state: {
		permissionsValues: null,
		rolesValues: null,
	},
	getters: {
	},
	mutations: {
		setPermissionsValues(state: any, payload: any){
			state.permissionsValues = payload;
		},
		setRolesValues(state: any, payload: any){
			state.rolesValues = payload;
		}
	},
	actions: {
		async init({dispatch}: any){
			await dispatch("fetchRoles");
			await dispatch("fetchPermissions");
		},
		async savePermissionsAPI(store: any, payload: any){
			let ret : any = {
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
			catch(err: any){
				console.warn("[permissions.savePermissionsAPI] ERORR: ", err.message);
			}
			return ret;
		},
		async editPermissionAPI(payload: any ){
			let ret : any = {
				result: false,
				message: "Save permission",
				code: 500,

			}

			try{
				
				ret = await instance.put("/api/admin/permissions", payload);
				
				if(ret.data.result) {				
					const d = ret.data;
					d.message = ret.data.message;
					return d.data;
				}


			}
			catch(err: any){
				console.warn("[permissions.editPermissionAPI] ERORR: ", err.message);
			}
		},
		async deletePermissionAPI(payload: any){

			let ret : any = {
				result: false,
				message: "Save permission",
				code: 500
			}
			
			try{                
				ret = await instance.delete(`/api/admin/permissions/${payload._id}`);

				if(ret.data.result) {
					const d = ret.data;
					d.message = ret.data.message;
					return d.data;
				}
				
			}
			catch(err: any){
				console.warn("[permissions.deletePermission] ERROR :", err.message);
			}

			return ret;

		},
		async saveRoleAPI(store: any, payload: any){
			let ret : any = {
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
			catch(err: any){
				console.warn("[permissions.saveRoleAPI] ERROR :", err.message);
			}
			return ret;
		},
		async fetchPermissions({commit}: any){
			try{
				let ret : any = {
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
			catch(err: any){
				console.warn("[permissions.fetchPermissions] ERROR: ", err.message);
			}
			commit("setPermissionsValues", null);
		},
		async fetchRoles({commit} : any){
			try{
				let ret : any = {
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
			catch(err: any){
				return null;
			}
		}
	}
}

export default permissionsModule;