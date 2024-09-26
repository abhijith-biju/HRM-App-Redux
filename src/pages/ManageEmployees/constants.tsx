import {
    IEmployee,
    IReactSelectOption,
    ISearchParams,
} from '../../interfaces/common';

export const empTableHeaders = [
    { value: 'id', label: 'Emp Id', isSortable: true, sortValue: 'id' },
    {
        value: 'fullName',
        label: 'Name',
        isSortable: true,
        sortValue: 'firstName',
    },
    { value: 'email', label: 'Email', isSortable: true, sortValue: 'email' },
    { value: 'role', label: 'Role', isSortable: false, sortValue: 'role' },
    {
        value: 'department',
        label: 'Department',
        isSortable: false,
        sortValue: 'department',
    },
    {
        value: 'actions',
        label: 'Actions',
        isSortable: false,
        sortValue: 'actions',
    },
];

export const locations: IReactSelectOption[] = [
    {
        value: 'L1',
        label: 'Trivandrum',
    },
    {
        value: 'L2',
        label: 'Vazhuthacaud',
    },
    {
        value: 'L3',
        label: 'Cochin',
    },
    {
        value: 'L4',
        label: 'Calicut',
    },
    {
        value: 'L5',
        label: 'Noida',
    },
    {
        value: 'L6',
        label: 'Bangalore',
    },
    {
        value: 'L7',
        label: 'Koratty',
    },
    {
        value: 'L8',
        label: 'Chennai',
    },
];

export const genders: IReactSelectOption[] = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'others', label: 'Others' },
];

// export const prefillDataOnEmployeeAdd: IEmployee = {
//     id: 0,
//     firstName: '',
//     email: '',
//     dob: '',
//     gender: '',
//     address: '',
//     role: null,
//     department: null,
//     dateOfJoining: '',
//     location: null,
//     skills: [],
//     moreDetails: '',
//     lastName: '',
//     isActive: true,
//     designation: '',
//     phone: '',
//     salary: '',
//     photoId: '',
// };

//FOR TESTING
export const prefillDataOnEmployeeAdd: IEmployee = {
    id: 0,
    firstName: 'abhib',
    email: 'abhib@qburst.com',
    dob: '2017-06-01',
    gender: 'female',
    address: 'abc street, pqr',
    role: {
        value: '1',
        label: 'Developer',
    },
    department: {
        value: '2',
        label: 'Marketing',
    },
    dateOfJoining: '2001-06-01',
    location: {
        value: 'L3',
        label: 'Cochin',
    },
    skills: [
        {
            value: '8',
            label: 'UI/UX Design',
        },
        {
            value: '2',
            label: 'Node',
        },
    ],
    moreDetails: '',
    lastName: '',
    isActive: true,
    designation: '',
    phone: '',
    salary: '',
    photoId: '',
};

export const defaultSearchParams: ISearchParams = {
    offset: 0,
    limit: 10,
    sortBy: 'firstName',
    sortDir: 'asc',
    skillIds: '',
    search: '',
};
