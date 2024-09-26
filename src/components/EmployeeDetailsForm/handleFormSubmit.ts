import { toast } from 'react-toastify';
import { IEmployee } from '../../interfaces/common';
import { IApiEmployeeSubmission } from '../../interfaces/ApiDataInterface';
import { AppDispatch } from '../../core/store';
import { getPhotoUrl } from '../../core/api/config/firebase';
import {
    addEmployeeAction,
    editEmployeeAction,
} from '../../core/store/employeesList/actions';

const handleFormSubmit = async (
    formSubmitData: IEmployee,
    photoRef: HTMLInputElement | null,
    dispatch: AppDispatch
) => {
    let photoUrl = '';
    try {
        if (formSubmitData.photoId) {
            photoUrl = formSubmitData.photoId;
        }

        if (photoRef?.files && photoRef?.files[0]) {
            photoUrl = await getPhotoUrl(photoRef.files[0]);
        }
    } catch (error) {
        toast.error('Profile photo could not be uploaded.');
        console.log(error);
    }

    const { id, gender, location, photoId, role, department, skills, ...rest } =
        formSubmitData;

    const moreDetails = {
        gender: gender,
        location: location ? location.label : null,
        photoId: photoUrl,
    };

    const apiSubmitData: IApiEmployeeSubmission = {
        ...rest,
        role: role ? Number(role.value) : null,
        department: department ? Number(department.value) : null,
        skills: skills.map((skill) => Number(skill.value)),
        moreDetails: JSON.stringify(moreDetails),
    };

    if (formSubmitData.id) {
        return dispatch(editEmployeeAction(formSubmitData.id, apiSubmitData));
    } else {
        return dispatch(addEmployeeAction(apiSubmitData));
    }
};

export default handleFormSubmit;
