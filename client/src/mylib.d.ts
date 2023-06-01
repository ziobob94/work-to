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


  
