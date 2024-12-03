"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileButton from '@/app/_components/profile';
import NewRoadmap from '@/app/_components/newRoadmap';

const Container = styled.div`
  padding: 24px;
`;

const PageName = styled.div`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  padding-right: 20px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #90D8BF;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #7EC5AD;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #F6F9F3;
  border-radius: 13px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SettingInfo = styled.div`
  flex: 1;
`;

const SettingTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #3C3C3C;
  margin-bottom: 6px;
`;

const SettingDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  margin-left: 20px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #90D8BF;
  }

  &:checked + span:before {
    transform: translateX(24px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const Button = styled.button`
  background: #90D8BF;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: #7EC5AD;
  }
`;

const DeleteButton = styled(Button)`
  background: #FF9494;
  
  &:hover {
    background: #FF7070;
  }
`;

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Container>
      <ProfileButton />
      <NewRoadmap />
      <PageName>설정</PageName>
      
      <SettingsContainer>
        <Section>
          <SectionTitle>화면 설정</SectionTitle>
          <SettingItem>
            <SettingInfo>
              <SettingTitle>다크 모드</SettingTitle>
              <SettingDescription>어두운 테마로 전환합니다</SettingDescription>
            </SettingInfo>
            <Toggle>
              <ToggleInput 
                type="checkbox" 
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <ToggleSlider />
            </Toggle>
          </SettingItem>
        </Section>
      </SettingsContainer>
    </Container>
  );
} 