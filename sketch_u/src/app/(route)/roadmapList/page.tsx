"use client";

import React from 'react';
import styled from 'styled-components';
import RoadmapCard from './roadmapCard';

const Roadmap: React.FC = () => {
  return (
    <Container>
      <PageName>내 로드맵</PageName>
      <Controls>
        <SortContainer>
          정렬 :
          <SortSelect>
            <SortOption value="A">A</SortOption>
            <SortOption value="B">B</SortOption>
          </SortSelect>
        </SortContainer>
        <Checkbox>
          진행중만 표시
          <input type="checkbox" />
          <StyledCheckBox>
            <img src="icons/Check.svg" alt="check" />
          </StyledCheckBox>
        </Checkbox>
      </Controls>
      <CardContainer>
        <RoadmapCard
          title="오브젝트 풀링 공부하기"
          subtitle="싱글턴 패턴 공부하기"
          category="유니티"
          daysLeft={3}
          progress={4}
          maxProgress={8}
        />
        <RoadmapCard
          title="해머링 & 풀링"
          subtitle="스웰 피킹"
          category="일렉기타"
          daysLeft={1}
          progress={3}
          maxProgress={10}
        />
        <RoadmapCard
          title="발로란트 레디언트 찍기"
          subtitle=""
          category="발로란트"
          daysLeft={13}
          progress={5}
          maxProgress={10}
        />
        <RoadmapCard
          title="고양이랑 싸우기"
          subtitle="고양이 기르기"
          category="고양이"
          daysLeft={0}
          progress={6}
          maxProgress={10}
        />
      </CardContainer>
    </Container>
  );
};

export default Roadmap;

const Container = styled.div`
  padding: 24px;
`;

const PageName = styled.div`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 16px;
`;  

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const SortContainer = styled.div`
  width: 152px;
  height: 45px;
  border-radius: 13px;
  background-color: #F4F4F4;
  font-weight: 600;
  font-size: 17px;
  filter: drop-shadow(0 4px 5px rgba(0,0,0,0.15));
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SortSelect = styled.select`
  padding: 4px 8px;
  font-size: 14px;
  width: 80px;
  height: 36px;
  border-radius: 13px;
  margin-left: 15px;

  &:hover {
    border-color: #BDBDBD;
  }

  &:focus {
    border-color: #90CAF9;
    box-shadow: 0 0 8px rgba(144, 202, 249, 0.4);
  }
`;

const SortOption = styled.option`
  font-size: 16px;
  font-weight: 600;
  background-color: #FFFFFF;
  color: #333;
  padding: 10px;
`;

const Checkbox = styled.label`
  margin-left: 13px;
  width: 167px;
  height: 45px;
  border-radius: 13px;
  background-color: #F4F4F4;
  filter: drop-shadow(0 4px 5px rgba(0,0,0,0.15));
  font-weight: 600;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  input {
    display: none;
  }
  input[type="checkbox"]:checked + div img {
    display: block;
  }
`;

const StyledCheckBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 13px;
  margin-left: 8px;
  background-color: #F6F9F3;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: 28px;
    height: 28px;
    display: none;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
