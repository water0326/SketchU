"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileButton from '@/app/_components/profile';
import NewRoadmap from '@/app/_components/newRoadmap';
import { colors } from '@/app/utils/colorSheet';

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
    background: ${colors.roadmapPage.scrollbar.track};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.roadmapPage.scrollbar.thumb};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.roadmapPage.scrollbar.thumbHover};
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.text.primary};
  margin-bottom: 20px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: ${colors.completed.background};
  border-radius: 13px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px ${colors.completed.shadow};
`;

const SettingInfo = styled.div`
  flex: 1;
`;

const SettingTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.text.secondary};
  margin-bottom: 6px;
`;

const SettingDescription = styled.p`
  font-size: 14px;
  color: ${colors.text.secondary};
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
    background-color: ${colors.roadmapPage.button.primary};
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
    background-color: ${colors.white};
    transition: .4s;
    border-radius: 50%;
  }
`;

const Button = styled.button`
  background: ${colors.roadmapPage.button.primary};
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  color: ${colors.text.primary};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 8px ${colors.completed.shadow};

  &:hover {
    background: ${colors.roadmapPage.button.primaryHover};
  }
`;

const DeleteButton = styled(Button)`
  background: ${colors.roadmapPage.button.delete};
  
  &:hover {
    background: ${colors.roadmapPage.button.deleteHover};
  }
`;

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', JSON.stringify(checked));
  };

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
                onChange={(e) => handleDarkModeChange(e.target.checked)}
              />
              <ToggleSlider />
            </Toggle>
          </SettingItem>
        </Section>
      </SettingsContainer>
    </Container>
  );
} 