"use client";

import styled from "styled-components";
import MenuItemComponent from "./navMenuItem";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Container = styled.div`
  min-width: 300px;
  max-width: 300px;
  width: 300px;
  height: 100vh;
  background-color: #90D8BF;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 65px;
  margin-bottom: 131px;
  width: 149px;
  height: 99px;
  text-align: center;
  vertical-align: middle;
  font-size: 40px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding-left: 54px;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 114px;
  background-color: black;
  margin-left: 28px;
  margin-top: 2px;
`;

export default function Navigation() {
  const router = useRouter();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

  const menuItems = [
    { iconSrc: "/icons/Puzzle.svg", text: "로드맵", url: "/roadmap" },
    { iconSrc: "/icons/Calendar.svg", text: "캘린더", url: "/calendar" },
    { iconSrc: "/icons/Setting.svg", text: "설정", url: "/settings" }
  ];

  const handleMenuItemClick = (index: number, url: string) => {
    setSelectedMenuIndex(index);
    router.push(url);
  };

  return (
    <Container>
      <Logo>LOGO</Logo>
      <Menu>
        {menuItems.map((item, index) => (
          <div key={item.text}>
            <MenuItemComponent
              iconSrc={item.iconSrc}
              text={item.text}
              isselected={index === selectedMenuIndex}
              onclick={() => handleMenuItemClick(index, item.url)}
            />
            {index < menuItems.length - 1 && <VerticalLine />}
          </div>
        ))}
      </Menu>
    </Container>
  );
}
