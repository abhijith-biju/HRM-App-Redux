export interface IEmployee {
    id: number;
    firstName: string;
    lastName: string;
    isActive: boolean;
    dob: string;
    email: string;
    phone: string;
    designation: string;
    salary: string;
    dateOfJoining: string;
    address: string;
    role: IReactSelectOption | null;
    department: IReactSelectOption | null;
    skills: IReactSelectOption[] | [];
    moreDetails: string;
    location: IReactSelectOption | null;
    gender: string;
    photoId: string;
}

export interface IEmployeeListing {
    actions: JSX.Element;
    id: number;
    fullName: string;
    isActive: boolean;
    dob: string;
    email: string;
    phone: string;
    designation: string;
    salary: string;
    dateOfJoining: string;
    address: string;
    role: string;
    department: string;
    skills: number[];
    moreDetails: string;
    location: string;
    gender: string;
    photoId: string;
}

export interface IReactSelectOption {
    label: string;
    value: string;
}

export interface ISearchParams {
    offset: number;
    limit: number;
    sortBy: string;
    sortDir: string;
    skillIds: string;
    search: string;
}
