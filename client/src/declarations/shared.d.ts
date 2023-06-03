export declare type ApiReturn = {
	result: boolean,
	message: string,
	code: number,
	data?: any,
	error?: any
}


export declare type CustomState = 
	UserState |
	PermissionState |
	AuthState

	

export declare interface RootState {
	modules: {
		permissionsAd: PermissionsState,
		user: UserState,
		auth: AuthState
	}
}


  
export declare interface SharedModule {
	swalOptions: SweetAlertOptions,
	toggleSwal: boolean
}



declare module 'vuex' {
	interface Store<S> {
		state: S & SharedModule;
	}
}