'use client';

import dataProviderSimpleRest from '@refinedev/simple-rest';

const API_URL = 'https://api.ivita.vn/api';

export const dataProvider = dataProviderSimpleRest(API_URL);
