'use client'

import NewRoadmap from '@/app/_components/newRoadmap'
import ProfileButton from '@/app/_components/profile'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RoadmapService } from '@/services/roadmapService';

interface TimelineItem {
  seq: number
  topic: string
  description: string
  start_date: string
  deadline: string
  note: string | null
}

interface RoadmapData {
  roadmapId: number
  roadmapName: string
  userEntity: {
    id: number
    username: string
    password: null
  } | null
  achieved: number
  clear: boolean
  sessionData: {
    result: TimelineItem[]
  }
}

// RoadmapData 인터페이스를 배열로 사용할 수 있도록 수정
interface TimelineDataState {
  timelines: RoadmapData[]
}

export default function Timeline() {
  const [timelineData, setTimelineData] = useState<TimelineDataState>({ timelines: [] })
  const [dayWidth, setDayWidth] = useState(80)
  // 드래그 상태 추가
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [currentDatePosition, setCurrentDatePosition] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<{
    roadmapName: string;
    seq: number;
    topic: string;
    description: string;
    startDate: string;
    deadline: string;
    status: string;
    position: { x: number; y: number };
  } | null>(null);

  // 드래그 이벤트 핸들러 추가
  const handleMouseDown = (e: React.MouseEvent) => {
    const element = e.currentTarget as HTMLElement
    setIsDragging(true)
    setStartX(e.pageX - element.offsetLeft)
    setScrollLeft(element.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (e.currentTarget as HTMLElement).offsetLeft
    const walk = (x - startX) * 2 // 스크롤 속도 조절
    e.currentTarget.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 확대/축소 함수 추가
  const handleZoom = (type: 'in' | 'out') => {
    setDayWidth(prev => {
      if (type === 'in') return prev + 10
      return prev > 20 ? prev - 10 : prev // 최소 너비 20px로 제한
    })
  }

  useEffect(() => {
    const fetchRoadmaps = async () => {
      const result = await RoadmapService.getAllRoadmaps();
      
      if (result.success && result.data) {
        const transformedData = result.data.map(roadmap => ({
          ...roadmap,
          sessionData: {
            result: roadmap.sessionData
          }
        }));
        setTimelineData({ timelines: transformedData });
      } else {
        // If API call fails, use mock data
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
            "roadmapId": 123,
            "roadmapName": "유니티 배우기",
            "userEntity": {
              "id": 456,
              "username": "testUser",
              "password": null
            },
            "achieved": 0,
            "clear": false,
            "sessionData": {
              "result": [
                {
                  "seq": 1,
                  "topic": "유니티 다운로드 및 설치",
                  "description": "유니티 공식 웹사이트에서 유니티 허브를 다운로드하고 설치합니다.",
                  "start_date": "2024-11-27",
                  "deadline": "2024-12-01",
                  "note": null
                },
                {
                  "seq": 2,
                  "topic": "유니티 인터페이스 이해",
                  "description": "유니티의 기본적인 인터페이스 및 기능에 익숙해지고 간단한 프로젝트를 생성해 봅니다.",
                  "start_date": "2024-12-01",
                  "deadline": "2024-12-05",
                  "note": null
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
                  description: "Python 공식 웹사이트에서 최신 버전을 다운로드하고 설치하세요.",
                  start_date: "2024-11-26",
                  deadline: "2024-12-01",
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
        ]
        setTimelineData({ timelines: mockData })
        
        if (result.error === 'Unauthorized') {
          // Redirect to login page if unauthorized
          window.location.href = '/login';
        }
      }
    };

    fetchRoadmaps();
  }, [])

  const getDateRange = () => {
    if (!timelineData?.timelines?.length) {
      return {
        minDate: new Date(),
        maxDate: new Date()
      };
    }

    let minDate = new Date();
    let maxDate = new Date();
    let hasValidDates = false;

    timelineData.timelines.forEach(timeline => {
      if (!timeline?.sessionData?.result) return;
      
      timeline.sessionData.result.forEach(item => {
        const startDate = new Date(item.start_date);
        const endDate = new Date(item.deadline);

        if (!hasValidDates) {
          minDate = startDate;
          maxDate = endDate;
          hasValidDates = true;
        } else {
          if (startDate < minDate) minDate = startDate;
          if (endDate > maxDate) maxDate = endDate;
        }
      });
    });

    return { minDate, maxDate };
  };

  useEffect(() => {
    const { minDate } = getDateRange();
    if (!minDate) return;
    
    const today = new Date();
    const daysSinceStart = Math.floor((today.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    setCurrentDatePosition(daysSinceStart * dayWidth);
  }, [timelineData, dayWidth]);

  // 특정 날짜의 위치를 계산하는 함수 추가
  const calculateSpecificDatePosition = (dateString: string) => {
    const { minDate } = getDateRange();
    if (!minDate) return 0;
    
    const specificDate = new Date(dateString);
    const daysSinceStart = Math.floor((specificDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceStart * dayWidth;
  };

  return (
    <TimelineContainer>
      <NewRoadmap />
      <ProfileButton />
      <PageName>캘린더</PageName>
      <ZoomControls>
        <ZoomButton onClick={() => handleZoom('in')}>확대 (+)</ZoomButton>
        <ZoomButton onClick={() => handleZoom('out')}>축소 (-)</ZoomButton>
      </ZoomControls>
      <GridContainer>
        <TimelineContent
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <CurrentDateLine style={{ left: `${calculateSpecificDatePosition(new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/. /g, '-').replace('.', ''))}px`, transition: 'left 0.3s ease' }} />
          <XAxisContainer>
          </XAxisContainer>

          {timelineData.timelines.map((timeline) => {
            const firstStartDate = timeline.sessionData.result[0]?.start_date;
            const startDate = new Date(firstStartDate);
            const { minDate } = getDateRange();
            const daysSinceStart = minDate ? Math.floor((startDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
            const marginLeft = daysSinceStart * dayWidth;

            return (
              <TimelineWrapper
                key={timeline.roadmapId} 
                style={{ 
                  marginLeft: `${marginLeft}px`, 
                  transition: 'margin-left 0.3s ease'
                }}
              >
                {timeline.sessionData.result.map((item: TimelineItem, index: number) => {
                  const startDate = new Date(item.start_date);
                  const endDate = new Date(item.deadline);
                  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                  const isLastItem = index === timeline.sessionData.result.length - 1;

                  // 다음 세션과의 간격 계산
                  let gapToNextSession = 0;
                  if (!isLastItem) {
                    const nextSessionStart = new Date(timeline.sessionData.result[index + 1].start_date);
                    const currentSessionEnd = new Date(item.deadline);
                    gapToNextSession = Math.ceil((nextSessionStart.getTime() - currentSessionEnd.getTime()) / (1000 * 60 * 60 * 24));
                  }

                  return (
                    <TimelineItem 
                      key={item.seq} 
                      index={index}
                      style={{
                        marginRight: `${gapToNextSession * dayWidth - 20}px` // 기본 -20px 마진에 간격 추가
                      }}
                    >
                      <DateContainer>
                        <StartDate>{startDate.getMonth() + 1}/{startDate.getDate()}</StartDate>
                        {isLastItem && <EndDate>{endDate.getMonth() + 1}/{endDate.getDate()}</EndDate>}
                      </DateContainer>
                      <TimelineCard 
                        $seq={item.seq} 
                        $duration={duration} 
                        $dayWidth={dayWidth}
                        $status={
                          timeline.achieved === 0 && item.seq === 1 ? 'current'
                          : timeline.achieved > item.seq ? 'completed' 
                          : timeline.achieved === item.seq ? 'current' 
                          : 'upcoming'
                        }
                        style={{ width: `${duration * dayWidth + (index > 0 ? 20 : 0)}px` }}
                        onMouseEnter={(e) => {
                          setHoveredCard({
                            roadmapName: timeline.roadmapName,
                            seq: item.seq,
                            topic: item.topic,
                            description: item.description,
                            startDate: item.start_date,
                            deadline: item.deadline,
                            status: timeline.achieved === 0 && item.seq === 1 ? 'current'
                              : timeline.achieved > item.seq ? 'completed' 
                              : timeline.achieved === item.seq ? 'current' 
                              : 'upcoming',
                            position: {
                              x: e.clientX - 520,
                              y: e.clientY - 230
                            }
                          });
                        }}
                        onMouseMove={(e) => {
                          if (hoveredCard) {
                            setHoveredCard(prev => ({
                              ...prev!,
                              position: {
                                x: e.clientX - 520,
                                y: e.clientY - 230
                              }
                            }));
                          }
                        }}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <CardTitle>{timeline.roadmapName}: {String(item.seq).padStart(2, '0')}. {item.topic}</CardTitle>
                      </TimelineCard>
                    </TimelineItem>
                  );
                })}
              </TimelineWrapper>
            );
          })}
          {hoveredCard && (
            <Tooltip style={{ left: hoveredCard.position.x, top: hoveredCard.position.y }}>
              <TooltipTitle>
                {hoveredCard.roadmapName}
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: hoveredCard.status === 'completed' ? '#F0FFF4' : 
                                  hoveredCard.status === 'current' ? '#EBF8FF' : '#F7FAFC',
                  color: hoveredCard.status === 'completed' ? '#2F855A' : 
                         hoveredCard.status === 'current' ? '#2B6CB0' : '#718096'
                }}>
                  {hoveredCard.status === 'completed' ? '완료' :
                   hoveredCard.status === 'current' ? '진행 중' : '예정'}
                </span>
              </TooltipTitle>
              <TooltipContent>
                <div data-label="주제">{hoveredCard.topic}</div>
                <div data-label="설명">{hoveredCard.description}</div>
                <div data-label="기간">
                  {(() => {
                    const today = new Date();
                    const deadline = new Date(hoveredCard.deadline);
                    const diffTime = deadline.getTime() - today.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    if (diffDays < 0) return '마감일이 지났습니다';
                    if (diffDays === 0) return '오늘이 마감일입니다';
                    return `마감까지 ${diffDays}일 남았습니다`;
                  })()}
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </TimelineContent>
      </GridContainer>
    </TimelineContainer>
  )
}

const PageName = styled.div`
  font-size: 40px;
  font-weight: 600;
`;  

const TimelineContainer = styled.div`
  padding: 20px;
  overflow: hidden;
  position: relative;
  user-select: none;
  height: calc(100% - 20px);
`

const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 40px 0;
  min-width: fit-content;
  margin-left: 0;
`

const TimelineItem = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  margin-right: -20px;
  position: relative;
  z-index: ${props => 1000 - props.index};
`

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 4px;
`

const StartDate = styled.div`
  font-size: 14px;
  color: #666;
`

const EndDate = styled.div`
  font-size: 14px;
  color: #666;
`

const TimelineCard = styled.div<{ 
  $seq: number; 
  $duration: number; 
  $dayWidth: number;
  $status: 'completed' | 'current' | 'upcoming';
}>`
  display: flex;
  align-items: center;
  background-color: ${props => {
    switch (props.$status) {
      case 'completed':
        return '#F6F9F3';
      case 'current':
        return '#90D8BF';
      case 'upcoming':
        return '#F2F2F2';
    }
  }};
  border-radius: 100px;
  width: ${props => props.$duration * props.$dayWidth}px;
  height: 40px;
  padding: 12px;
  margin: 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: ${props => {
    switch (props.$status) {
      case 'completed':
        return '0 2px 4px rgba(0, 0, 0, 0.1)';
      case 'current':
        return '0 4px 8px rgba(0, 0, 0, 0.2)';
      case 'upcoming':
        return '0 1px 3px rgba(0, 0, 0, 0.08)';
    }
  }};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => {
      switch (props.$status) {
        case 'completed':
          return '0 4px 6px rgba(0, 0, 0, 0.15)';
        case 'current':
          return '0 6px 12px rgba(0, 0, 0, 0.25)';
        case 'upcoming':
          return '0 2px 4px rgba(0, 0, 0, 0.12)';
      }
    }};
    transform: translateY(-1px);
  }
`

const CardTitle = styled.h3`
  margin-left: 15px;
  font-size: 17px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  height: 100%;
`

const TimelineContent = styled.div`
  position: relative;
  overflow-x: auto;
  height: 100%;
  border-top: 1px solid #E0E0E0;
  border-left: 1px solid #E0E0E0;
  cursor: grab;
  user-select: none;
  padding-top: 20px;
  &:active {
    cursor: grabbing;
  }
  
  /* 스롤바 숨기기 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const XAxisContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 10px 0;
  z-index: 1;
`

const ZoomControls = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  margin-top: 15px;
`

const ZoomButton = styled.button`
  padding: 8px 20px;
  background-color: #F6F9F3;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #3C3C3C;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #90D8BF;
    color: #1A1A1A;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: ${props => 
      props.children?.toString().includes('+') 
        ? 'url("/icons/zoom-in.svg")'
        : 'url("/icons/zoom-out.svg")'
    };
  }
`;

const CurrentDateLine = styled.div`
  position: absolute;
  top: 20px;
  bottom: 0;
  width: 2px;
  background-color: #FF4444;
  z-index: 2000;
  pointer-events: none;

  &::after {
    content: '오늘 (${new Date().getMonth() + 1}/${new Date().getDate()})';
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #FF4444;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
  }
`;

const Tooltip = styled.div`
  position: fixed;
  background: white;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 3000;
  min-width: 280px;
  max-width: 360px;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -8px;
    transform: translateX(-50%);
    border-style: solid;
    border-width: 8px 8px 0 8px;
    border-color: white transparent transparent transparent;
  }
`;

const TooltipTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 2px solid #eee;
  color: #333;
`;

const TooltipContent = styled.div`
  font-size: 14px;
  color: #444;
  display: grid;
  gap: 6px;
  
  > div {
    display: grid;
    grid-template-columns: 60px 1fr;
    align-items: baseline;
    
    &::before {
      content: attr(data-label);
      font-weight: 600;
      color: #666;
    }
    
    &[data-label="기간"] {
      color: #2C5282;
      font-weight: 500;
    }
  }
`;

