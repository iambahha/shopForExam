import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';

const UserMenu = ({user, logout}) => (
    <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
            Hello, {user.displayname}
        </DropdownToggle>
        <DropdownMenu right>
            <DropdownItem tag={RouterNavLink} to={'/products/new'}>
                Add New Product
            </DropdownItem>
            <DropdownItem onClick={logout}>
                Logout
            </DropdownItem>
        </DropdownMenu>
    </UncontrolledDropdown>
);

export default UserMenu;