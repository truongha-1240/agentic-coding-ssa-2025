export interface LoginState {
	isLoading: boolean;
	error: string | null;
}

export interface AuthCallbackParams {
	code?: string;
	next?: string;
	error?: string;
	error_description?: string;
}
