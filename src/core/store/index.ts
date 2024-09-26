import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
    UnknownAction,
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import employeesReducer from './employeesList/reducer';
import employeeReducer from './employee/reducer';
import dropdownReducer from './dropdownData/reducer';
import { requestsRecuder } from './requests/reducer';
import { ThunkAction, thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    employees: employeesReducer,
    employee: employeeReducer,
    dropdownData: dropdownReducer,
    requests: requestsRecuder,
});

const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = Promise<any>> = ThunkAction<
    ReturnType,
    RootState,
    undefined,
    UnknownAction
>;

export default store;
