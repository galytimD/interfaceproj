import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DatasetService } from '../../services/datasetService';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import './datasets.css';
import { FilterMatchMode } from 'primereact/api';
import { Tag } from 'primereact/tag';
export default function Datasets() {
    const [datasets, setDatasets] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState(''); 
    const [statuses] = useState(['Ready', 'Proccessed', 'New']);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        quality: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    
    const getStatusSeverity = (dataset) => {
        switch (dataset.status) {
            case 'Ready': return 'success';
            case 'Proccessed': return 'warning';
            case 'New': return 'danger';
            default: return null;
        }
    };
    const getQualitySeverity = (dataset) => {
        switch (dataset.quality) {
            case 'Good': return 'success';
            case 'Normaly': return 'warning';
            case 'Poor': return 'danger';
            default: return null;
        }
    };
   
    useEffect(() => {
        // Синхронно загружаем данные, так как getDatasets возвращает массив напрямую
        setDatasets(DatasetService.getDatasets());
    }, []);
    const statusBodyTemplate = (dataset) => {
        return <Tag value={dataset.status} severity={getStatusSeverity(dataset)}></Tag>;
    };
    const qualityBodyTemplate = (dataset) => {
        return <Tag value={dataset.quality} severity={getQualitySeverity(dataset)}></Tag>;
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getStatusSeverity(option)} />;
    };
    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown 
            value={options.value}
            options={statuses} 
            onChange={(e) => options.filterApplyCallback(e.value)}
            itemTemplate={statusItemTemplate}
            placeholder="Select One"
            className="p-column-filter"
            showClear style={{ minWidth: '12rem' }} 
            />
        );
    };
    const header = renderHeader();

    return (
        <div className="table">
            <DataTable value={datasets} 
                stripedRows
                removableSort
                showGridlines
                //header={header}
                //filters={filters} filterDisplay="row" 
                globalFilterFields={['name','status','quality']}
                tableStyle={{ minWidth: '50rem' }}>  
                <Column field="name" sortable header="Name"  filter filterPlaceholder="Search by name" style={{ minWidth: '8rem' }} ></Column>
                <Column header="Quality" body={qualityBodyTemplate} sortable ></Column>
                <Column header="Status" body={statusBodyTemplate} sortable  filter showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} filterElement={statusRowFilterTemplate}></Column>
                <Column field="owner" header="Owner" sortable ></Column>
                <Column field="created_at" header="Created_at" sortable ></Column>
                
            </DataTable>
        </div>
    );
}
