// components/RoadmapCard.tsx
import React from 'react';
import styled from 'styled-components';

type RoadmapCardProps = {
  title: string;
  subtitle: string;
  category: string;
  daysLeft: number;
  progress: number;
  maxProgress: number;
};

const RoadmapCard: React.FC<RoadmapCardProps> = ({
  title,
  subtitle,
  category,
  daysLeft,
  progress,
  maxProgress,
}) => {
  return (
    <Card>
      <ProgressBar>
        {Array.from({ length: maxProgress }, (_, index) => (
          <ProgressIndicator key={index} active={index < progress} />
        ))}
      </ProgressBar>
      <TitleContainer>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </TitleContainer>
      <InfoContainer>
        <Category>{category}</Category>
        <DaysLeft>{daysLeft}일 남음</DaysLeft>
      </InfoContainer>
    </Card>
  );
};

export default RoadmapCard;

const Card = styled.div`
  width: 334px;//calc(25% - (38px));
  margin: 19px;
  background: #F6F9F3;
  border-radius: 13px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  
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
`;

const Subtitle = styled.p`
  color: #1C1C1C;
  font-size: 14px;
  font-weight: 400;
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
