import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const NewProductForm = ({ showMsg, visible, onHide, onSubmit }) => {

    const [store, setStore] = useState({
        address: "",
        email: "",
        name: "",
        phone: "593"
    });

    const validateForm = () => {
        if (store.name && store.address && store.email && store.phone) {
            if (!validateEmail(store.email)) {
                showMsg("Por favor, ingresa un correo electrónico válido.");
                return false;
            }
            if (!validatePhone(store.phone)) {
                showMsg("Por favor, ingresa un número de teléfono válido. Mínimo 9 dígitos, máximo 12.");
                return false;
            }
            return true;
        }
        showMsg("Por favor, completa todos los campos obligatorios.");
        return false;
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{9,12}$/;
        return regex.test(phone);
    };

    const clear = () => {
        setStore({ address: "", email: "", name: "", phone: "593" });
    };

    const clearAndHide = () => {
        clear();
        onHide();
    };

    const handleSave = () => {
        if (!validateForm()) {
            return;
        }
        onSubmit(store);
        clear();
        onHide();
    };

    return (
        <Dialog
            header="Agregar nuevo local"
            visible={visible}
            style={{ width: "30vw" }}
            onHide={onHide}
        >
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="name">Nombre del local</label>
                    <InputText
                        id="name"
                        value={store.name}
                        onChange={(e) => setStore({ ...store, name: e.target.value })}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="address">Dirección</label>
                    <InputText
                        id="address"
                        value={store.address}
                        onChange={(e) => setStore({ ...store, address: e.target.value })}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="email">Correo electrónico</label>
                    <InputText
                        id="email"
                        value={store.email}
                        onChange={(e) => setStore({ ...store, email: e.target.value })}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="phone">Teléfono</label>
                    <InputText
                        id="phone"
                        value={store.phone}
                        onChange={(e) => setStore({ ...store, phone: e.target.value })}
                    />
                </div>
            </div>

            <div className="p-dialog-footer">
                <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={clearAndHide} />
                <Button label="Guardar" icon="pi pi-check" className="p-button-success" onClick={handleSave} />
            </div>
        </Dialog>
    );
};

export default NewProductForm;
