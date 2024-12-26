import { apiInstance } from '../base'

import { ICafeDescription } from './types'

const BASE_URL = 'cafes'

export const getCafe = (cafeId: string): Promise<ICafeDescription> => {
    return apiInstance.get(`${BASE_URL}/${cafeId}`)
}
