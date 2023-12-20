import { IEmployee } from '../../interfaces/common';
import { IApiEmployeeSubmission } from '../../interfaces/ApiDataInterface';
import { API } from '../../core/api';
import { toast } from 'react-toastify';
import { getPhotoUrl } from '../../core/api/config/firebase';

const handleFormSubmit = async (
    formSubmitData: IEmployee,
    empId: string | null,
    photoRef: HTMLInputElement | null
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

    try {
        await API({
            method: empId ? 'PATCH' : 'POST',
            url: empId ? `/employee/${empId}` : '/employee',
            data: apiSubmitData,
        });
        toast.success(
            `Employee details ${empId ? 'edited' : 'added'} successfully.`
        );
    } catch (error) {
        toast.error(`${empId ? 'Edit' : 'Add'} employee details failed.`);
        console.log(`${empId ? 'Edit' : 'Add'} failed`, error);
    }
};

export default handleFormSubmit;
