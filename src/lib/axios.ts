import { BACKEND_URL } from '$lib/constants';
import base from 'axios';

export const axios = base.create({ url: BACKEND_URL });
