import { AxiosError, isAxiosError } from 'axios';

export const getErrorMessage = (error: any) => {
	let message = '';
	if (isAxiosError(error)) {
		const axiosError: AxiosError = error;

		if (axiosError.response?.data) {
			message = axiosError.response.data as any;
		} else {
			message = axiosError.message;
		}
	} else {
		message = error.message;
	}

	console.log('Error message:', message);

	return message;
};
