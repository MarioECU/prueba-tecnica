import React, { useEffect, useState } from 'react';
import NewStoreForm from './NewStoreForm';
import { getStores, createStore, updateStock } from '../../services/StoresService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import InventoryView from './InventoryView';
import { getStoreById } from '../../services/StoresService';

const StoreTable = ({ showMsg }) => {
    const [stores, setStores] = useState([]);
    const [showNewStoreDialog, setShowNewStoreDialog] = useState(false);
    const [showInventoryDialog, setShowInventoryDialog] = useState(false);
    const [storeData, setStoreData] = useState({ inventories: [] });

    const fetchStores = async () => {
        try {
            const fetchedStores = await getStores();
            setStores(fetchedStores);
        } catch (error) {
            showMsg('Error al obtener los locales: ' + error);
        }
    };

    const updateStoreData = async () => {
        try {
            const updatedStore = await getStoreById(storeData.id);
            setStoreData(updatedStore);
        } catch (error) {
            showMsg('Error al actualizar el local: ' + error);
        }
    }

    useEffect(() => {
        fetchStores();
    }, []);

    const handleAddStore = async (newStore) => {
        try {
            const p = await createStore(newStore);
            newStore.id = p.idGenerated;
            setStores([...stores, newStore]);
            showMsg('Local agregado correctamente.', 'success', 'Éxito');
        } catch (error) {
            showMsg('Error al agregar el local: ' + error);
        }
    };

    return (
        <div style={{ margin: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Lista de locales</h2>
                <Button label="Agregar local" className="p-button-raised p-button-success" onClick={() => setShowNewStoreDialog(true)} />
            </div>
            <NewStoreForm showMsg={showMsg} visible={showNewStoreDialog} onHide={() => setShowNewStoreDialog(false)} onSubmit={handleAddStore} />
            <InventoryView storeData={storeData} showMsg={showMsg} visible={showInventoryDialog} onHide={() => setShowInventoryDialog(false)} updateData={updateStoreData} />
            <div className="card">
                <DataTable value={stores} paginator rows={7} dataKey="id" emptyMessage="No se encontraron locales.">
                    <Column field="id" header="ID"></Column>
                    <Column field="name" header="Nombre"></Column>
                    <Column field="address" header="Dirección"></Column>
                    <Column field="phone" header="Teléfono"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column
                        body={(rowData) => (
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <Button
                                    icon="pi pi-list"
                                    className="p-button-rounded p-button-info"
                                    onClick={() => {
                                        setStoreData(rowData);
                                        setShowInventoryDialog(true);
                                    }}
                                    tooltip="Ver Inventario"
                                />
                                <Button
                                    icon="pi pi-chart-line"
                                    className="p-button-rounded p-button-success"
                                    onClick={() => console.log('Ver ventas:', rowData)}
                                    tooltip="Ver Ventas"
                                />
                            </div>
                        )}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default StoreTable;
