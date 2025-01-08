import { authHandlers } from './auth';
import { reviewHandlers } from './review';

export const handlers = [
    ...authHandlers,
    ...reviewHandlers
];
