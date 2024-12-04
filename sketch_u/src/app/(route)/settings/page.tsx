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
  font-size: 32px;
  font-weight: 800;
  color: #2C3E50;
  margin-bottom: 32px;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #90D8BF, transparent);
    border-radius: 2px;
  }
`;

const CreatorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px;
  background: linear-gradient(145deg, #F6F9F3, #FFFFFF);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(144, 216, 191, 0.2);
  height: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  }
`;

const SettingInfo = styled.div`
  flex: 1;
`;

const SettingTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #2C3E50;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:after {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #90D8BF, #7EC5AD);
    border-radius: 2px;
    margin-left: 8px;
  }
`;

const SettingDescription = styled.p`
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
    padding: 16px;
    background: rgba(144, 216, 191, 0.1);
    border-radius: 8px;
    font-family: 'Roboto Mono', monospace;
  }
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

const Role = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: linear-gradient(135deg, #90D8BF, #7EC5AD);
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(144, 216, 191, 0.3);
`;

const LinkButton = styled(Button)`
  padding: 8px 16px;
  font-size: 14px;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  
  &:last-child {
    margin-right: 0;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
`;

// 개발자 정보 타입 정의 수정
interface Developer {
  name: string;
  role: string;
  responsibilities: string[];
  contact: {
    github: string;
    email: string;
    portfolio?: string; // optional portfolio URL
  };
}

// 개발자 정보 데이터 수정
const developers: Developer[] = [
  {
    name: "김동훈",
    role: "Server / AI Developer",
    responsibilities: [
      "Backend Architecture 설계 및 구현",
      "AI 모델 개발 및 최적화",
      "서버 인프라 구축 및 관리",
      "API 설계 및 구현"
    ],
    contact: {
      github: "kjbddo",
      email: "kjbddo@gmail.com"
    }
  },
  {
    name: "이정",
    role: "UI / UX Developer",
    responsibilities: [
      "Frontend Architecture 설계 및 구현",
      "UI/UX 디자인 및 개발",
      "사용자 경험 최적화"
    ],
    contact: {
      github: "water0326",
      email: "besteunju4@gmail.com",
      portfolio: "https://zircon-sink-85a.notion.site/10d2f179af5e8091b1a0d339258736d3?v=fff2f179af5e813d87ef000ce3df927b"  // 포트폴리오 URL 추가
    }
  }
];

// 개발자 카드 컴포넌트 수정
const DeveloperCard = ({ developer }: { developer: Developer }) => (
  <SettingItem>
    <SettingInfo>
      <SettingTitle>{developer.name}</SettingTitle>
      <Role>{developer.role}</Role>
      <SettingDescription>
        {developer.responsibilities.map((resp, index) => (
          <React.Fragment key={index}>
            • {resp}<br />
          </React.Fragment>
        ))}
      </SettingDescription>
      <SettingDescription>
        • Email: {developer.contact.email}
      </SettingDescription>
      <ButtonContainer>
        <LinkButton 
          onClick={() => window.open(`https://github.com/${developer.contact.github}`, '_blank')}
        >
          GitHub
        </LinkButton>
        {developer.contact.portfolio && (
          <LinkButton 
            onClick={() => window.open(developer.contact.portfolio, '_blank')}
          >
            Portfolio
          </LinkButton>
        )}
      </ButtonContainer>
    </SettingInfo>
  </SettingItem>
);

export default function SettingsPage() {
  return (
    <Container>
      <ProfileButton />
      <NewRoadmap />
      <PageName>설정</PageName>
      
      <SettingsContainer>
        <Section>
          <SectionTitle>제작자</SectionTitle>
          <CreatorsGrid>
            {developers.map((developer, index) => (
              <DeveloperCard key={index} developer={developer} />
            ))}
          </CreatorsGrid>
        </Section>
      </SettingsContainer>
    </Container>
  );
} 