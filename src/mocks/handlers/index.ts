import { authHandlers } from './auth';
import { reviewHandlers } from './review';
import { cafeHandlers } from './cafe';

export const handlers = [
    ...authHandlers,
    ...reviewHandlers,
    ...cafeHandlers
];
