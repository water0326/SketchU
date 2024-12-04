"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RoadmapCard from './roadmapCard';
import { useRouter } from 'next/navigation';
import ProfileButton from '@/app/_components/profile';
import NewRoadmap from '@/app/_components/newRoadmap';
import { RoadmapService } from '@/services/roadmapService';
import { RoadmapListResponse } from '@/types/roadmap';


const Roadmap: React.FC = () => {
  const [roadmapData, setRoadmapData] = useState<RoadmapListResponse[]>([]);
  const [sortOption, setSortOption] = useState<string>("deadline");
  const [showOnlyInProgress, setShowOnlyInProgress] = useState(false);
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const roadmapId = searchParams?.get('roadmapId') || null;
  const [isLoading, setIsLoading] = useState(true);

  const sortRoadmaps = (data: RoadmapListResponse[], option: string) => {
    return [...data].sort((a, b) => {
      if (option === "deadline") {
        const daysLeftA = a.sessionData?.[a.achieved]
          ? Math.ceil(
              (new Date(a.sessionData[a.achieved].deadline).getTime() -
                new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            )
          : 0;
        const daysLeftB = b.sessionData?.[b.achieved]
          ? Math.ceil(
              (new Date(b.sessionData[b.achieved].deadline).getTime() -
                new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            )
          : 0;
        return daysLeftA - daysLeftB;
      } else {
        return a.roadmapName.localeCompare(b.roadmapName);
      }
    });
  };

  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      setIsLoading(true);
      try {
        const result = await RoadmapService.getAllRoadmaps();
        
        if (result.success && result.data) {
          let sortedData = sortRoadmaps(result.data, sortOption);
          
          if (showOnlyInProgress) {
            sortedData = sortedData.filter(roadmap => !roadmap.clear);
          }

          if (roadmapId) {
            const selectedRoadmap = sortedData.find(
              (roadmap) => roadmap.roadmapId === Number(roadmapId)
            );
            if (selectedRoadmap) {
              setRoadmapData([selectedRoadmap]);
            }
          } else {
            setRoadmapData(sortedData);
          }
        } else {
          if (result.error === 'Unauthorized') {
            router.push('/login');
            return;
          }
          console.error('로드맵 데이터 가져오기 실패:', result.error);
        }
      } catch (error) {
        console.error('API 호출 에러:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmaps();
  }, [roadmapId, router, sortOption, showOnlyInProgress]);

  useEffect(() => {
  }, [roadmapData]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleRedirect = async () => {
    try {
      await router.push('/roadmapList');
    } catch (error) {
      console.error('라우팅 에러:', error);
    }
  };

  return (
    <Container>
      <ProfileButton />
      <PageName>내 로드맵</PageName>
      <NewRoadmap />
      <Controls>
        <SortContainer>
          정렬 :
          <SortSelect value={sortOption} onChange={handleSortChange}>
            <SortOption value="deadline">남은 기간 순</SortOption>
            <SortOption value="abc">가나다 순</SortOption>
          </SortSelect>
        </SortContainer>
        <Checkbox>
          진행중만 표시
          <input 
            type="checkbox" 
            checked={showOnlyInProgress}
            onChange={(e) => setShowOnlyInProgress(e.target.checked)}
          />
          <StyledCheckBox>
            <img src="/icons/check.svg" alt="check" />
          </StyledCheckBox>
        </Checkbox>
      </Controls>
      <CardContainer> 
        {roadmapData.map((roadmap) => (
          <div key={roadmap.roadmapId}>
            <RoadmapCard
              roadmapId={roadmap.roadmapId}
              clear={roadmap.clear}
              currentSession={
                roadmap.sessionData?.[roadmap.achieved]?.topic || '진행중인 세션 없음'
              }
              nextSession={
                roadmap.sessionData?.[roadmap.achieved + 1]?.topic || '다음 세션 없음'
              }
              category={roadmap.roadmapName}
              daysLeft={
                roadmap.sessionData?.[roadmap.achieved]
                  ? Math.ceil(
                      (new Date(roadmap.sessionData[roadmap.achieved].deadline).getTime() -
                        new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                    )
                  : 0
              }
              progress={roadmap.achieved}
              maxProgress={roadmap.sessionData?.length || 0}
            />
          </div>
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
  width: 200px;
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
  width: 120px;
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
  max-height: calc(100vh - 220px);
  overflow-y: auto;
  padding-right: 8px;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

