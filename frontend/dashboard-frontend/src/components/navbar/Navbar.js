import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const goTo = useNavigate();

    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            command: () => goTo('/')
        },
        {
            label: 'Productos',
            icon: 'pi pi-fw pi-box',
            command: () =>  goTo('/products')
        },
        {
            label: 'Locales',
            icon: 'pi pi-fw pi-home',
            command: () => goTo('/stores')
        },
    ];

    return (
        <div>
            <Menubar model={items} />
        </div>
    );
}

export default Navbar;
