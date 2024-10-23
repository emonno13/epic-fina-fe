'use client';

import conversation from './conversation';
import families from './families';
import modal from './modal';
import settings from './settings';
import submission from './submission';

export default {
  ...families,
  ...settings,
  ...conversation,
  ...submission,
  ...modal,
};
