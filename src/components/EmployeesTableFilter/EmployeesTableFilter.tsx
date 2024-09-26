import { useAppSelector, useAppDispatch } from '../../hooks/storeHelpers';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
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
    const [empNameFilter, setEmpNameFilter] = useState<string>('');

    const prevSkillFilter = useRef<MultiValue<IReactSelectOption>>(skillFilter);
    const prevEmpNameFilter = useRef<string>(empNameFilter);

    const selectSkillsData = useAppSelector(
        (state) => state.dropdownData.skills.skillsData
    );

    const handleSearchInputChange = () => {
        if (empNameFilter === prevEmpNameFilter.current) {
            return;
        }
        dispatch(employeeListClear());
        searchParams.set('offset', '0');

        if (!empNameFilter) {
            searchParams.delete('search');
        } else {
            searchParams.set('search', empNameFilter);
        }
        setSearchParams(searchParams);
        prevEmpNameFilter.current = empNameFilter;
    };

    const handleSkillSelectChange = () => {
        if (
            JSON.stringify(skillFilter) ===
            JSON.stringify(prevSkillFilter.current)
        ) {
            return;
        }
        dispatch(employeeListClear());
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
        prevSkillFilter.current = skillFilter;
    };

    const handleClearBtnClick = () => {
        if (!empNameFilter && !skillFilter.length) {
            return;
        }
        setSkillFilter([]);
        prevSkillFilter.current = [];
        searchParams.delete('skillIds');
        setEmpNameFilter('');
        prevEmpNameFilter.current = '';
        searchParams.delete('search');
        dispatch(employeeListClear());
        setSearchParams(searchParams);
    };

    // Update skill filter select dropdown state based on URL param
    useEffect(() => {
        if (selectSkillsData) {
            const urlSelectedSkillValues =
                searchParams.get('skillIds')?.split(',') || [];

            const selectedSkillsFromUrl = selectSkillsData.filter((option) =>
                urlSelectedSkillValues.includes(option.value)
            );
            if (
                JSON.stringify(selectedSkillsFromUrl) !==
                JSON.stringify(skillFilter)
            ) {
                dispatch(employeeListClear());
                setSkillFilter(selectedSkillsFromUrl);
                prevSkillFilter.current = selectedSkillsFromUrl;
            }
        }
    }, [selectSkillsData, searchParams.get('skillIds')]);

    //Update employee name filter state based on URL params
    useEffect(() => {
        const newSearchValue = searchParams.get('search') || '';
        if (newSearchValue !== empNameFilter) {
            dispatch(employeeListClear());
            setEmpNameFilter(newSearchValue);
            prevEmpNameFilter.current = newSearchValue;
        }
    }, [searchParams.get('search')]);

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
                placeholder="Filter by Employee Name"
                value={empNameFilter}
                onChange={(event) => {
                    setEmpNameFilter(
                        event.target.value.trimStart().toLowerCase()
                    );
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
