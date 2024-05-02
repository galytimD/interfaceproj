import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DatasetService } from '../../services/DatasetService';
import { Tag } from 'primereact/tag';
import './datasets.css';

const Datasets = () =>  {
    const [datasets, setDatasets] = useState([]);
    const navigate = useNavigate(); 
    const getStatusSeverity = (dataset) => {
        switch (dataset.status) {
            case 'ready': return 'success';
            case 'processed': return 'warning';
            case 'unprocessed': return 'danger';
            case 'data_engineered': return 'info';
            default: return null;
        }
    };

    const getQualitySeverity = (dataset) => {
        switch (dataset.quality_status) {
            case 'excellent': return 'success';
            case 'poor': return 'danger';
            case 'not_evaluated': return 'info';
            case 'good': return 'info';
            default: return null;

        }
    };

    useEffect(() => {
        fetchData();
        
    }, []);

    const fetchData = async () => {
        try {
            const response = await DatasetService.getAll();
            setDatasets(response.data);
            //console.log(response.data)
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    const statusBodyTemplate = (dataset) => {
        return <Tag value={dataset.status} severity={getStatusSeverity(dataset)}></Tag>;
    };

    const qualityBodyTemplate = (dataset) => {
        return <Tag value={dataset.quality_status} severity={getQualitySeverity(dataset)}></Tag>;
    };
    const onRowSelect = (e) => {
        navigate(`/datasets/${e.data.id}`);  // Изменено на navigate
    };

    return (
        <div className="table">
            <DataTable value={datasets}
                dataKey="id" 
                onRowClick={onRowSelect} // Добавление обработчика клика
                removableSort showGridlines 
                selectionMode="single"
                tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="id"  style={{ minWidth: '8rem' }} />
                <Column field="name" header="Название" sortable style={{ minWidth: '8rem' }} />
                <Column header="Качество" body={qualityBodyTemplate} sortable />
                <Column header="Статус" body={statusBodyTemplate} sortable />
                <Column field="createTime" header="Дата" sortable />
                <Column field="imageCount" header="Количество изображений" sortable />
            </DataTable>
        </div>
    );
}
export default Datasets;