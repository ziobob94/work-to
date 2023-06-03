import { PermissionsState } from '@/shared';

export declare interface PermissionsState {
		permissionsValues: any[],
		rolesValues: any[]
}


export declare type PermissionValue = {
	name: string,
	slug: string,
	description: string,
	rolesIDS: RoleValue[]
}

export declare type RoleValue = {
	_id: any,
	name: string,
	slug: string
}

declare module 'vuex' {
  interface Store<S> {
    state: S & PermissionsState;
  }
}

