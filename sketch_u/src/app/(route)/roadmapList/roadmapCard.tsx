// components/RoadmapCard.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

type RoadmapCardProps = {
  currentSession: string;
  nextSession: string;
  category: string;
  daysLeft: number;
  progress: number;
  maxProgress: number;
  roadmapId: number;
  clear: boolean;
};

const RoadmapCard: React.FC<RoadmapCardProps> = ({
  currentSession: title,
  nextSession: subtitle,
  category,
  daysLeft,
  progress,
  maxProgress,
  roadmapId,
  clear,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/roadmap?roadmapId=${roadmapId}`);
  };

  return (
    <Card $clear={clear} onClick={handleClick}>
      <ProgressBar>
        {Array.from({ length: maxProgress }, (_, index) => (
          <ProgressIndicator key={index} active={index < progress} />
        ))}
      </ProgressBar>
      <TitleContainer>
        <Title>{clear ? "완료한 세션" : title}</Title>
        {!clear && <Subtitle>{subtitle}</Subtitle>}
      </TitleContainer>
      <InfoContainer>
        <Category>{category}</Category>
        {!clear && <DaysLeft>{daysLeft}일 남음</DaysLeft>}
      </InfoContainer>
      {clear && <CompleteIcon src="/icons/complete.svg" alt="완료" />}
    </Card>
  );
};

export default RoadmapCard;

const Card = styled.div<{ $clear: boolean }>`
  width: 334px;
  height: 233px;
  margin: 19px;
  background: ${props => props.$clear ? '#E5E5E5' : '#F6F9F3'};
  border-radius: 13px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: ${props => props.$clear ? 0.8 : 1};
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
    background: ${props => props.$clear ? '#DADADA' : '#F0F5EC'};
  }
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-right: 17px;
  padding-left: 17px;
  margin-bottom: 19px;
  margin-top: 24px;
  height: 53px;
  
`;

const ProgressIndicator = styled.div<{ active: boolean }>`
  flex: 1;
  height: 100%;
  background-color: ${(props) => (props.active ? '#90D8BF' : '#e0e0e0')};
  border-radius: 7px;
  &:not(:last-child) {
    margin-right: 6px;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  padding-right: 17px;
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  margin-bottom: 40px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 21px;
  font-weight: 500;
  color: #2B2B2B;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`;

const Subtitle = styled.p`
  color: #1C1C1C;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  margin: 0;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: auto;
  margin-bottom: 13px;
  bottom: 0px;
  justify-content: space-between;
  align-items: end;
  padding-left: 17px;
  padding-right: 17px;
`;

const Category = styled.span`
  display: block;
  margin-top: 8px;
  font-size: 17px;
  font-weight: 500;
  color: #000000;
`;

const DaysLeft = styled.span`
  display: block;
  margin-top: 4px;
  font-weight: 600;
  font-size: 12px;
  color: #2792DF;
`;

const CompleteIcon = styled.img`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 72px;
`;
