import {
    IEmployeeListing,
    IEmployee,
    IReactSelectOption,
} from '../interfaces/common';
import { IApiEmployee } from '../interfaces/ApiDataInterface';
import { Button, LinkButton } from '../components';
import { locations } from '../pages/ManageEmployees/constants';

export const fillEmptySlotsWithValue = (arr: any[], value: any) =>
    Array.from(arr, (_, i) => {
        if (!(i in arr)) return value;
        else return arr[i];
    });

//sort array object by sortKey (slice() to create a new array)
export const sortObjByKey = (srcObjArray: any[], sortKey: string) => {
    return srcObjArray
        .slice()
        .sort((a: any, b: any) =>
            a[sortKey].toLowerCase().localeCompare(b[sortKey].toLowerCase())
        );
};

export const filterObjByKey = (srcObjArray: any[], sortKey: string) => {
    const uniqueObjArray = srcObjArray.filter(
        (option: any, index: number, array: any[]) =>
            index === 0 || option[sortKey] !== array[index - 1][sortKey]
    );
    return uniqueObjArray;
};

//modify option object to {value: string, label: string}
export const modifySelectOption = (optionObj: any, curLabelKey: string) => {
    const newObj = {
        value: String(optionObj.id),
        label: String(optionObj[curLabelKey]),
    } as IReactSelectOption;
    return newObj;
};

//modify each option object in options array to {value: string, label: string}
export const modifySelectOptionsArray = (
    optionsArr: any[],
    curLabelKey: string
) => {
    let newOptionsArr: IReactSelectOption[] = [];
    for (const optionObj of optionsArr) {
        newOptionsArr.push(modifySelectOption(optionObj, curLabelKey));
    }
    newOptionsArr = sortObjByKey(newOptionsArr, 'label');
    return filterObjByKey(newOptionsArr, 'label');
};

export const getObjectFromLabel = (
    searchLabel: string,
    refArray: IReactSelectOption[]
) => {
    const targetObj = refArray.find((obj) => obj.label === searchLabel);
    return targetObj ?? null;
};

export const getObjectFromValue = (
    searchValue: string,
    refArray: IReactSelectOption[]
) => {
    const targetObj = refArray.find((obj) => obj.value === searchValue);
    return targetObj ?? null;
};

// modify fetched employee details to format required for employee form
export const modifyFetchedEmployeeData = (employeeObj: IApiEmployee) => {
    const moreDetails = employeeObj.moreDetails
        ? JSON.parse(employeeObj.moreDetails)
        : {};
    const newEmployeeObj: IEmployee = {
        id: employeeObj.id,
        firstName: employeeObj.firstName || '',
        lastName: employeeObj.lastName || '',
        isActive: employeeObj.isActive || false,
        dob: employeeObj.dob || '',
        email: employeeObj.email || '',
        phone: employeeObj.phone || '',
        designation: employeeObj.designation || '',
        salary: employeeObj.salary || '',
        dateOfJoining: employeeObj.dateOfJoining || '',
        address: employeeObj.address || '',
        department: employeeObj.department
            ? modifySelectOption(employeeObj.department, 'department')
            : null,

        role: employeeObj.role
            ? modifySelectOption(employeeObj.role, 'role')
            : null,

        skills: employeeObj.skills
            ? modifySelectOptionsArray(employeeObj.skills, 'skill')
            : [],

        moreDetails: employeeObj.moreDetails,
        location: moreDetails?.location
            ? getObjectFromLabel(moreDetails.location, locations)
            : null,

        gender: moreDetails?.gender ? moreDetails.gender : '',
        photoId: moreDetails?.photoId ? moreDetails.photoId : '',
    };
    return newEmployeeObj;
};

//modify fetched employee details to format for employee listing table
export const getEmployeesListingData = (
    employeesList: IApiEmployee[],
    setIsModalOpen: (isOpen: boolean) => void,
    setEmpIdToDelete: (empIdToDelete: number) => void
) => {
    const newEmpList: IEmployeeListing[] = [];
    for (const emp of employeesList) {
        const {
            firstName,
            lastName,
            department,
            role,
            skills,
            location,
            ...rest
        } = modifyFetchedEmployeeData(emp);

        const newEmp: IEmployeeListing = {
            ...rest,
            fullName: firstName + ' ' + lastName,
            department: department ? department.label : 'N/A',
            role: role ? role.label : 'N/A',
            location: location ? location.label : 'N/A',
            skills: skills.map((skill) => Number(skill.value)),
            actions: (
                <ul className="employee-actions flex-container">
                    <li>
                        <LinkButton
                            to={`/view-employee/${emp.id}`}
                            className="view-emp-btn flex-container"
                        >
                            <span className="material-symbols-rounded">
                                visibility
                            </span>
                        </LinkButton>
                    </li>
                    <li>
                        <LinkButton
                            to={`/edit-employee/${emp.id}`}
                            className="edit-emp-btn flex-container"
                        >
                            <span className="material-symbols-rounded">
                                edit_square
                            </span>
                        </LinkButton>
                    </li>
                    <li>
                        <Button
                            type="button"
                            className="delete-emp-btn flex-container"
                            onClick={() => {
                                setEmpIdToDelete(emp.id);
                                setIsModalOpen(true);
                            }}
                        >
                            <span className="material-symbols-rounded">
                                delete
                            </span>
                        </Button>
                    </li>
                </ul>
            ),
        };
        newEmpList.push(newEmp);
    }
    return newEmpList;
};
