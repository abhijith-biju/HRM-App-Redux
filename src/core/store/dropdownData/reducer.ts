import { combineReducers } from 'redux';
import skillsReducer from './skills/reducer';
import rolesReducer from './roles/reducer';
import departmentsReducer from './departments/reducer';

const dropdownReducer = combineReducers({
    skills: skillsReducer,
    departments: departmentsReducer,
    roles: rolesReducer,
});

export default dropdownReducer;
