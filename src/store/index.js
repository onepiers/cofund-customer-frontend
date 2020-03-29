// store/index.js
import { createStoreon } from 'storeon'
import { persistState } from '@storeon/localstorage'

import { auth } from './auth'
import {entrepreneur} from './entrepreneur'

export const store = createStoreon([auth, entrepreneur, persistState(['token'])])