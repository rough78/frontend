import { authHandlers } from './auth';
import { reviewHandlers } from './review';
import { cafeHandlers } from './cafe';
import { imageHandlers } from './image';

export const handlers = [
    ...authHandlers,
    ...reviewHandlers,
    ...cafeHandlers,
    ...imageHandlers
];
