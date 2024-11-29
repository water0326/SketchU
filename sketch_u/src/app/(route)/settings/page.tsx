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
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <Container>
      <ProfileButton />
      <NewRoadmap />
      <PageName>설정</PageName>
      
      <SettingsContainer>
        <Section>
          <SectionTitle>알림 설정</SectionTitle>
          <SettingItem>
            <SettingInfo>
              <SettingTitle>푸시 알림</SettingTitle>
              <SettingDescription>로드맵 마감일 알림을 받습니다</SettingDescription>
            </SettingInfo>
            <Toggle>
              <ToggleInput 
                type="checkbox" 
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <ToggleSlider />
            </Toggle>
          </SettingItem>
          
          <SettingItem>
            <SettingInfo>
              <SettingTitle>이메일 알림</SettingTitle>
              <SettingDescription>주간 진행상황 리포트를 이메일로 받습니다</SettingDescription>
            </SettingInfo>
            <Toggle>
              <ToggleInput 
                type="checkbox" 
                checked={emailUpdates}
                onChange={(e) => setEmailUpdates(e.target.checked)}
              />
              <ToggleSlider />
            </Toggle>
          </SettingItem>
        </Section>

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

        <Section>
          <SectionTitle>계정 관리</SectionTitle>
          <SettingItem>
            <SettingInfo>
              <SettingTitle>계정 삭제</SettingTitle>
              <SettingDescription>모든 데이터가 영구적으로 삭제됩니다</SettingDescription>
            </SettingInfo>
            <DeleteButton>계정 삭제</DeleteButton>
          </SettingItem>
        </Section>
      </SettingsContainer>
    </Container>
  );
} 