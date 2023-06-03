export declare interface AuthState {
	user: any
}

declare module 'vuex' {
	interface Store<S> {
		state: S & AuthState;
	}
}