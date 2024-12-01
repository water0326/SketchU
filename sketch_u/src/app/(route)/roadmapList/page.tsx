"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RoadmapCard from './roadmapCard';
import { useRouter } from 'next/navigation';
import ProfileButton from '@/app/_components/profile';
import NewRoadmap from '@/app/_components/newRoadmap';
import { RoadmapService } from '@/services/roadmapService';
import { RoadmapListResponse } from '@/types/roadmap';

// RoadmapData 인터페이스 추가
interface TimelineItem {
  seq: number;
  topic: string;
  description: string;
  start_date: string;
  deadline: string;
  note: string | null;
}

const Roadmap: React.FC = () => {
  const [roadmapData, setRoadmapData] = useState<RoadmapListResponse[]>([]);
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const roadmapId = searchParams.get('roadmapId');

  useEffect(() => {
    const fetchRoadmaps = async () => {
      const result = await RoadmapService.getAllRoadmaps();
      
      if (result.success && result.data) {
        if (roadmapId) {
          const selectedRoadmap = result.data.find(
            (roadmap) => roadmap.roadmapId === Number(roadmapId)
          );
          if (selectedRoadmap) {
            setRoadmapData([selectedRoadmap]);
          }
        } else {
          setRoadmapData(result.data);
        }
      } else {
        if (result.error === 'Unauthorized') {
          router.push('/login');
          return;
        }
        console.error('Failed to fetch roadmaps:', result.error);
      }
    };

    fetchRoadmaps();
  }, [roadmapId, router]);

  return (
    <Container>
      <ProfileButton />
      <PageName>내 로드맵</PageName>
      <NewRoadmap />
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
        {roadmapData.map((roadmap) => (
          <RoadmapCard
            key={roadmap.roadmapId}
            roadmapId={roadmap.roadmapId}
            currentSession={roadmap.sessionData.result[roadmap.achieved]?.topic || ''}
            nextSession={roadmap.sessionData.result[roadmap.achieved+1]?.topic || ''}
            category={roadmap.roadmapName}
            daysLeft={
              roadmap.sessionData.result[0]
                ? Math.ceil(
                    (new Date(roadmap.sessionData.result[0].deadline).getTime() -
                      new Date(roadmap.sessionData.result[0].start_date).getTime()) /
                        (1000 * 60 * 60 * 24)
                  )
                : 0
            }
            progress={roadmap.achieved}
            maxProgress={roadmap.sessionData.result.length}
          />
        ))}
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
