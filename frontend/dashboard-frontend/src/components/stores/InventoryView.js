import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import NewInventoryForm from './NewInventoryForm';

const InventoryView = ({ storeData, visible, showMsg, onHide, updateData }) => {
    const [showInventoryForm, setShowInventoryForm] = useState(false);

    return (
        <Dialog
            header={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Inventario de local: {storeData.name}</span>
                    {/*
                    <Button
                        icon="pi pi-refresh"
                        className="p-button-rounded p-button-info"
                        onClick={() => updateData()}
                    />*/}
                    <Button 
                        label='Agregar registro'
                        className="p-button-rounded p-button-success"
                        onClick={() => setShowInventoryForm(true)} 
                    />
                </div>
            }
            visible={visible}
            style={{ width: "70vw" }}
            onHide={onHide}
        >
            <NewInventoryForm showMsg={showMsg} visible={showInventoryForm} onHide={() => setShowInventoryForm(false)} storeObj={storeData} />
            {storeData.inventories.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <p><strong>No hay productos en inventario para este local.</strong></p>
                </div>
            ) : (

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
            }}>
                {storeData.inventories.map((inventory) => (
                    <div key={inventory.id} className="p-col-12 p-md-6 p-lg-4">
                        <Card
                            title={inventory.product.name}
                            subTitle={`Presentación: ${inventory.product.unitAmount} ${inventory.product.unitOfMeasure}`}
                            style={{ marginBottom: "1em" }}
                        >
                            <p><strong>Descripción:</strong> {inventory.product.description}</p>
                            <p><strong>Precio:</strong> ${inventory.product.price.toFixed(2)}</p>
                            <p><strong>Stock:</strong> {inventory.stockQty}</p>
                        </Card>
                    </div>
                ))}
            </div>
            )}
        </Dialog>
    );
};

export default InventoryView;
