import { combineReducers } from 'redux';

import main from "./main"
import auth from './auth';
import product from "./product"
import cart from "./cart"
import order from "./order"
import filter from "./filter"
export const reducers = combineReducers({ main,auth,product,cart,order,filter });