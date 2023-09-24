import { AxiosError, isAxiosError } from 'axios';

export const getErrorMessage = (error: any) => {
	if (isAxiosError(error)) {
		const axiosError: AxiosError = error;

		if (axiosError.response?.data) {
			return axiosError.response.data;
		}

		return axiosError.message;
	} else {
		return error.message;
	}
};
