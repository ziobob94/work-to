
export declare interface UserState{
	user: any
}

declare module 'vuex' {
	interface Store<S> {
		state: S & UserState;
	}
}