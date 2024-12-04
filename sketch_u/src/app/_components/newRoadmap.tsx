import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Button = styled.button`
  position: absolute;
  right: 60px;
  background-color: #90D8BF;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  filter: drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.2));
  z-index: 100;

  &:hover {
    background-color: #A8E4D0;
    transform: translateY(-2px);
    filter: drop-shadow(1px 4px 6px rgba(0, 0, 0, 0.25));
    
    & + div {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  right: 45px;
  top: 55px;
  background-color: #FFFFFF;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  white-space: nowrap;
  z-index: 99;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #FFFFFF;
  }
`;

export default function NewRoadmap() {
  const router = useRouter();

  return (
    <div style={{ position: "absolute", top: "13px", right: "25px", width: "100px", height: "100px"}}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Button onClick={() => router.push("/createRoadmap")}>
          <img src="/icons/add.svg" alt="Add Roadmap" />
        </Button>
        <Tooltip>새 로드맵 만들기</Tooltip>
      </div>
    </div>
  );
}
