import { instance } from '@/main';
import { ApiReturn } from '@/declarations/shared';
import { PermissionValue, PermissionsState, RoleValue } from '@/declarations/permissions';
import { Module } from 'vuex';

const permissionsModule: Module<PermissionsState, any>= {
	namespaced: true,
	state: {
		permissionsValues: [],
		rolesValues: [],
	},
	getters: {
	},
	mutations: {
		setPermissionsValues(state: PermissionsState, payload: PermissionValue[]){
			state.permissionsValues = payload;
		},
		setRolesValues(state: PermissionsState, payload: RoleValue[]){
			state.rolesValues = payload;
		}
	},
	actions: {
		async init({dispatch}: any){
			await dispatch("fetchRoles");
			await dispatch("fetchPermissions");
		},
		async savePermissionsAPI({commit}: any, payload: PermissionValue[]): Promise<ApiReturn>{
			
			let ret : ApiReturn = {
				result: false,
				message: "Save permission failed",
				code: 500
			}
			
			try{
				
				const resp = await instance.post("/api/admin/permissions", payload);
				
				if(resp.data) {
					ret = resp.data;
				}
				
			}
			catch(err: any){
				console.warn("[permissions.savePermissionsAPI] ERORR: ", err.message);
			}
			
			return ret;
		},
		async editPermissionAPI(store: any , payload: PermissionValue ) : Promise<ApiReturn>{
			let ret : ApiReturn = {
				result: false,
				message: "Save permission",
				code: 500,
				
			}
			try{
				
				const resp = await instance.put("/api/admin/permissions", payload);
				
				if(resp.data) {
					ret = resp.data;
				}
				
				
			}
			catch(err: any){
				console.warn("[permissions.editPermissionAPI] ERORR: ", err.message);
			}
			return ret;
		},
		async deletePermissionAPI(store: any, payload: PermissionValue) : Promise<ApiReturn>{
			
			let ret : ApiReturn = {
				result: false,
				message: "Save permission",
				code: 500
			}
			
			try{                
				ret = await instance.post(`/api/admin/permissions/${payload.slug}`);
				
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
		async saveRoleAPI(store: any, payload: RoleValue[]): Promise<ApiReturn>{
			let ret : ApiReturn = {
				result: false,
				message: "Save permission",
				code: 500
			}
			
			try{
				
				const resp = await instance.post("/api/admin/roles", payload);
				
				if(resp.data) {
					ret = resp.data;
				}
				
			}  
			catch(err: any){
				console.warn("[permissions.saveRoleAPI] ERROR :", err.message);
			}
			
			return ret;
		},
		async editRoleAPI(store: any , payload: RoleValue ) : Promise<ApiReturn>{
			let ret : ApiReturn = {
				result: false,
				message: "Save permission",
				code: 500,
				
			}
			
			try{
				
				const resp = await instance.put("/api/admin/roles", payload);
				
				if(resp.data) {
					ret = resp.data;
				}
				
				
			}
			catch(err: any){
				console.warn("[permissions.editRoleAPI] ERORR: ", err.message);
			}
			return ret;
		},
		async deleteRoleAPI(store: any, payload: RoleValue) : Promise<ApiReturn>{
			
			let ret : ApiReturn = {
				result: false,
				message: "Save permission",
				code: 500
			}
			//eslint-disable-next-line
			debugger;
			console.log("PAYLOAD: ", payload)
			try{                
				ret = await instance.post(`/api/admin/permissions`, payload);
				
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
		async fetchPermissions({commit}: any) : Promise<ApiReturn> {
			let ret : ApiReturn = {
				result: false,
				message: "Save permission failed",
				code: 500
			}
			try{
				
				const resp = await instance.get("/api/admin/permissions");
				
				if( resp.data ) {
					const tmp : ApiReturn = resp.data;
					if(tmp.result){
						commit("setPermissionsValues", tmp.data);
					}
					ret = tmp.data;
				}
				return ret;
			}
			catch(err: any){
				console.warn("[permissions.fetchPermissions] ERROR: ", err.message);
			}
			commit("setPermissionsValues", null);
			return ret;
		},
		async fetchRoles({commit} : any) : Promise<ApiReturn> {
			let ret : ApiReturn = {
				result: false,
				message: "Save roles ",
				code: 500
			}
			try{
				ret = await instance.get("/api/admin/roles");
				
				if(ret.data.result){
					const d : ApiReturn = ret.data;
					commit("setRolesValues", d.data);
					d.message = ret.data.message;
					return d.data;
				}
				
			}
			catch(err: any){
				console.warn("[permissions.fetchRoles] ERROR: ", err.message);
			}
			return ret;
		}
	}
}

export default permissionsModule;