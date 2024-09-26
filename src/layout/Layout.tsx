import { useAppDispatch } from '../hooks/storeHelpers';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';
import { fetchSkills } from '../core/store/dropdownData/skills/actions';
import { fetchDepartments } from '../core/store/dropdownData/departments/actions';
import { fetchRoles } from '../core/store/dropdownData/roles/actions';

const Layout: React.FC = () => {
    const dispatch = useAppDispatch();

    dispatch(fetchSkills());
    dispatch(fetchDepartments());
    dispatch(fetchRoles());

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
