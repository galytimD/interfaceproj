import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';


const Navbar =  function () {
    const navigate = useNavigate();
    const items = [
        {
            label: 'Датасеты',
            icon: 'pi pi-table',
            command: () => navigate('/datasets')
        },
        {
            label: 'Обработанные изображения',
            icon: 'pi pi-table',
            command: () => navigate('/preprocessed')
        },
        {
            label: 'Статистика',
            icon: 'pi pi-chart-scatter',
            command: () => navigate('/statistics')
        },
        {
            label: 'Карта',
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
  