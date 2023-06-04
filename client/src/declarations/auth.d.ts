export declare interface AuthState {
	isAuthenticated: any
}

declare module 'vuex' {
	interface Store<S> {
		state: S & AuthState;
	}
}