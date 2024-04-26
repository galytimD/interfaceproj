import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';


const Navbar =  function () {
    const navigate = useNavigate();
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        {
            label: 'Datasets',
            icon: 'pi pi-table',
            command: () => navigate('/datasets')
        },
        {
            label: 'Statistics',
            icon: 'pi pi-chart-scatter',
            command: () => navigate('/statistics')
        },
        {
            label: 'Map',
            icon: 'pi pi-map',
            command: () => navigate('/map')
        }
    ];
    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}
export default Navbar;
  