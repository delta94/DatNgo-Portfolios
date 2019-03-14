import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const PortButtonDropdown = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const { items } = props;

  const renderMenu = () => {
    return (
      <DropdownMenu>
        {items.map((item, index) => (
          <DropdownItem key={index} {...item.handler}>
            {item.text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    );
  };

  return (
    <ButtonDropdown
      className="port-dropdown"
      isOpen={dropdownOpen}
      toggle={toggle}
    >
      <DropdownToggle size="sm">
        <i className="fas fa-caret-down" />
      </DropdownToggle>
      {renderMenu()}
    </ButtonDropdown>
  );
};

export default PortButtonDropdown;
