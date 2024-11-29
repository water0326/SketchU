"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RoadmapCard from './roadmapCard';
import { useRouter } from 'next/navigation';
import ProfileButton from '@/app/_components/profile';
import NewRoadmap from '@/app/_components/newRoadmap';

// RoadmapData 인터페이스 추가
interface TimelineItem {
  seq: number;
  topic: string;
  description: string;
  start_date: string;
  deadline: string;
  note: string | null;
}

interface RoadmapData {
  roadmapId: number;
  roadmapName: string;
  userEntity: {
    id: number;
    username: string;
    password: null;
  };
  achieved: number;
  clear: boolean;
  sessionData: {
    result: TimelineItem[];
  };
}

const Roadmap: React.FC = () => {
  const [roadmapData, setRoadmapData] = useState<RoadmapData[]>([]);
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const roadmapId = searchParams.get('roadmapId');

  useEffect(() => {
    // 캘린더 페이지의 mockData를 그대로 사용
    const mockData: RoadmapData[] = [
      {
        roadmapId: 1,
        roadmapName: "기타 배우기",
        userEntity: {
          id: 1,
          username: "testUser",
          password: null
        },
        achieved: 3,
        clear: false,
        sessionData: {
          result: [
            {
              seq: 1,
              topic: "기타 구매하기",
              description: "150만원짜리 펜더 텔레캐스터를 구매하세요!",
              start_date: "2024-11-23",
              deadline: "2024-12-02",
              note: null
            },
            {
              seq: 2,
              topic: "피킹 연습하기",
              description: "크로매틱 연습을 통해 300 bpm까지 연습해보세요!",
              start_date: "2024-12-02",
              deadline: "2024-12-06",
              note: null
            },
            {
              seq: 3,
              topic: "노래 연주해보기",
              description: "반짝반짝 작은별 노래를 연주해보며, 사용감을 익히세요!",
              start_date: "2024-12-06",
              deadline: "2024-12-11",
              note: null
            },
            {
              seq: 4,
              topic: "해머링 & 풀링",
              description: "해머링과 풀링을 연습하여 원손의 다양한 기술을 습득해보세요!",
              start_date: "2024-12-11",
              deadline: "2024-12-20",
              note: null
            }
          ]
        }
      },
      {
        roadmapId: 123,
        roadmapName: "유니티 배우기",
        userEntity: {
          id: 456,
          username: "testUser",
          password: null
        },
        achieved: 0,
        clear: false,
        sessionData: {
          result: [
            {
              seq: 1,
              topic: "유니티 다운로드 및 설치",
              description: "유니티 공식 웹사이트에서 유니티 허브를 다운로드하고 설치합니다.",
              start_date: "2024-11-27",
              deadline: "2024-12-01",
              note: null
            },
            {
              seq: 2,
              topic: "유니티 인터페이스 이해",
              description: "유니티의 기본적인 인터페이스 및 기능에 익숙해지고 간단한 프로젝트를 생성해 봅니다.",
              start_date: "2024-12-01",
              deadline: "2024-12-05",
              note: null
            }
          ]
        }
      },
      {
        roadmapId: 2,
        roadmapName: "프로그래밍 배우기",
        userEntity: {
          id: 2,
          username: "devUser",
          password: null
        },
        achieved: 1,
        clear: false,
        sessionData: {
          result: [
            {
              seq: 1,
              topic: "Python 설치하기",
              description: "Python 공식 웹사이트에서 최신 버전을 다운���드하고 설치하세요.",
              start_date: "2024-11-28",
              deadline: "2024-12-03",
              note: null
            },
            {
              seq: 2,
              topic: "기본 문법 배우기",
              description: "변수, 조건문, 반복문 등 Python의 기본 문법을 학습하세요.",
              start_date: "2024-12-03",
              deadline: "2024-12-10",
              note: null
            },
            {
              seq: 3,
              topic: "간단한 프로젝트 만들기",
              description: "간단한 계산기 프로그램을 만들어 보세요.",
              start_date: "2024-12-10",
              deadline: "2024-12-15",
              note: null
            }
          ]
        }
      },
      {
        roadmapId: 3,
        roadmapName: "요리 배우기",
        userEntity: {
          id: 3,
          username: "chefUser",
          password: null
        },
        achieved: 0,
        clear: false,
        sessionData: {
          result: [
            {
              seq: 1,
              topic: "기본 재료 준비하기",
              description: "기본적인 요리 재료를 준비하세요.",
              start_date: "2024-11-30",
              deadline: "2024-12-05",
              note: null
            },
            {
              seq: 2,
              topic: "간단한 요리 만들기",
              description: "계란 프라이와 같은 간단한 요리를 만들어 보세요.",
              start_date: "2024-12-05",
              deadline: "2024-12-10",
              note: null
            }
          ]
        }
      }
    ];

    if (roadmapId) {
      const selectedRoadmap = mockData.find(
        (roadmap) => roadmap.roadmapId === Number(roadmapId)
      );
      if (selectedRoadmap) {
        setRoadmapData([selectedRoadmap]);
      }
    } else {
      setRoadmapData(mockData);
    }
  }, [roadmapId]);

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
            title={roadmap.roadmapName}
            subtitle={roadmap.sessionData.result[0]?.topic || ''}
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
