import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  right: 0;
  background-color: #f2f2f2;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  filter: drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.2));

  &:hover {
    background-color: #e1e1e1;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 65px;
  right: 0px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DropdownButton = styled.button`
  background-color: #f2f2f2;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e1e1e1;
  }
`;

export default function ProfileButton() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div style={{ position: "absolute", top: "13px", right: "25px", width: "100px", height: "100px"}}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Button
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
        >
            <img src="/icons/Profile.svg" alt="Profile Icon" />
        </Button>
        {showDropdown && (
            <DropdownMenu
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            >
            <DropdownButton>Login</DropdownButton>
            <DropdownButton>Logout</DropdownButton>
            </DropdownMenu>
        )}
        </div>
    </div>
  );
}
