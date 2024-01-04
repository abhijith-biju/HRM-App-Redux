import { useAppSelector, useAppDispatch } from '../../hooks/storeHelpers';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Input, Button } from '..';
import Select, { MultiValue } from 'react-select';
import {
    CustomSelectStyles,
    StyledEmployeesFilterWrap,
} from './EmployeesTableFilter.style';
import { IReactSelectOption } from '../../interfaces/common';
import { employeeListClear } from '../../core/store/employeesList/actions';

const EmployeesTableFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [skillFilter, setSkillFilter] = useState<
        MultiValue<IReactSelectOption>
    >([]);
    const [empNameFilter, setEmpNameFilter] = useState<string>(
        searchParams.get('search') || ''
    );

    const selectSkillsData = useAppSelector(
        (state) => state.dropdownData.skills.skillsData
    );

    const handleSearchInputChange = () => {
        searchParams.set('offset', '0');

        if (!empNameFilter) {
            searchParams.delete('search');
        } else {
            searchParams.set('search', empNameFilter);
        }
        setSearchParams(searchParams);
    };

    const handleSkillSelectChange = () => {
        searchParams.set('offset', '0');

        if (!skillFilter.length) {
            searchParams.delete('skillIds');
        } else {
            const selectedOptionsValue = skillFilter.map(
                (option) => option.value
            );
            searchParams.set('skillIds', selectedOptionsValue.toString());
        }
        setSearchParams(searchParams);
    };

    const handleClearBtnClick = () => {
        if (!empNameFilter && !skillFilter.length) {
            return;
        }
        setSkillFilter([]);
        searchParams.delete('skillIds');
        setEmpNameFilter('');
        searchParams.delete('search');
        dispatch(employeeListClear());
        setSearchParams(searchParams);
    };

    // Update skill filter select dropdown state based on URL parameters
    useEffect(() => {
        if (selectSkillsData) {
            const urlSelectedSkillValues = searchParams
                .get('skillIds')
                ?.split(',');

            if (urlSelectedSkillValues) {
                const selectedSkillsFromUrl = selectSkillsData.filter(
                    (option) => urlSelectedSkillValues.includes(option.value)
                );
                setSkillFilter(selectedSkillsFromUrl);
            }
        }
    }, [selectSkillsData]);

    const debounceTimeout = 500;

    //debounce employees list fetch on employee name and skills filter change
    useEffect(() => {
        const timeout = setTimeout(handleSearchInputChange, debounceTimeout);
        return () => clearTimeout(timeout);
    }, [empNameFilter]);

    useEffect(() => {
        const timeout = setTimeout(handleSkillSelectChange, debounceTimeout);
        return () => clearTimeout(timeout);
    }, [skillFilter]);

    return (
        <StyledEmployeesFilterWrap>
            <Input
                placeholder="Filter by Employee First Name"
                value={empNameFilter}
                onChange={(event) => {
                    setEmpNameFilter(
                        event.target.value.trimStart().toLowerCase()
                    );
                    dispatch(employeeListClear());
                }}
                className="table-control-field"
            />
            <Select
                options={selectSkillsData}
                value={skillFilter}
                name="searchSkills"
                isMulti
                closeMenuOnSelect={false}
                styles={CustomSelectStyles}
                placeholder="Filter by skills"
                onChange={(selectedOptions) => {
                    setSkillFilter(selectedOptions);
                    dispatch(employeeListClear());
                }}
            />
            <Button
                className="outline icon-btn margin-left-auto table-control-field"
                onClick={handleClearBtnClick}
            >
                <span>Clear Filters</span>
                <span className="material-symbols-rounded">filter_alt_off</span>
            </Button>
        </StyledEmployeesFilterWrap>
    );
};

export default EmployeesTableFilter;
