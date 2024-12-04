"use client";

import styled from "styled-components";
import MenuItemComponent from "./navMenuItem";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

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
  margin-top: 55px;
  margin-bottom: 141px;
  width: 229px;
  height: 99px;
  text-align: center;
  vertical-align: middle;
  font-size: 40px;
  cursor: pointer;
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
  const pathname = usePathname();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

  const menuItems = [
    { iconSrc: process.env.PUBLIC_URL + "icons/puzzle.svg", text: "로드맵", url: "/roadmapList" },
    { iconSrc: process.env.PUBLIC_URL + "icons/calendar.svg", text: "캘린더", url: "/calendar" },
    { iconSrc: process.env.PUBLIC_URL + "icons/setting.svg", text: "크레딧", url: "/settings" }
  ];

  useEffect(() => {
    const roadmapRoutes = ['/roadmapList', '/roadmap', '/createRoadmap'];
    const isRoadmapRoute = roadmapRoutes.some(route => pathname.startsWith(route));
    
    if (isRoadmapRoute) {
      setSelectedMenuIndex(0);
    } else {
      const currentIndex = menuItems.findIndex(item => pathname.startsWith(item.url));
      if (currentIndex !== -1) {
        setSelectedMenuIndex(currentIndex);
      }
    }
  }, [pathname]);

  const handleMenuItemClick = (index: number, url: string) => {
    setSelectedMenuIndex(index);
    router.push(url);
  };

  const handleLogoClick = () => {
    router.push('/roadmapList');
    setSelectedMenuIndex(0);
  };

  return (
    <Container>
      <Logo onClick={handleLogoClick}>
        <img src="/icons/logo.png" alt="LOGO" />
      </Logo>
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
