"use client";
  
import styled from 'styled-components';
import React, { useState } from 'react';
import ProfileButton from '@/app/_components/profile';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const PageName = styled.div`
  font-size: 40px;
  font-weight: 600;
  margin-left: 31px;
  margin-top: 16px;
`;  

const ContentContainer = styled.div`
  margin-top: 26px;
  margin-bottom: 38px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 120px);
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 64.6%;
  background: transparent;
  padding: 1rem;
  border-radius: 13px;
  height: 100%;
  padding: 0 59px;
  
`;

const Content = styled.div`
  background: #F2F2F2;
  border-radius: 13px;
  width: 35%;
  height: 100%;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
`;

const HeaderIcons = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  gap: 15px;
  align-items: center;
`;

const CloseIcon = styled.span`
  position: absolute;
  left: 20px;
  cursor: pointer;
`;

const ContentHeader = styled.div`
  padding: 20px 26px 10px 26px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HeaderTitle = styled.div`
  font-size: 26px;
  font-weight: 600;
  text-align: left;
  margin-top: 20px;
`;

const ContentBody = styled.div`
  padding: 0px 26px 18px 26px;
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 600;
  color: #3C3C3C;
`;

const MemoTitle = styled.div`
  font-weight: 600;
  font-size: 26px;
  margin: 5px 0 5px 0;
`;

const MemoContent = styled.textarea`
  background: #FFFFFF;
  padding: 15px;
  border-radius: 8px;
  flex: 1;
  margin: 0 0 20px 0;
  color: #3C3C3C;
  border: none;
  resize: none;
  font-family: inherit;
  font-size: inherit;

  &:focus {
    outline: none;
  }
`;

const SaveButton = styled.button<{ isActive: boolean }>`
  width: calc(100% - 52px);
  height: 37px;
  margin: 0 26px 19px 26px;
  background: ${props => props.isActive ? '#90D8BF' : '#D9D9D9'};
  border: none;
  border-radius: 13px;
  color: ${props => props.isActive ? '#000000' : '#666666'};
  font-weight: 600;
  font-size: 17px;
  cursor: ${props => props.isActive ? 'pointer' : 'default'};

  &:hover {
    background: ${props => props.isActive ? '#7EC5AD' : '#D9D9D9'};
  }
`;

const CancelButton = styled(SaveButton)`
  background: #FF9494;
  color: #000000;
  cursor: pointer;

  &:hover {
    background: #FF7070;
  }
`;

const RoadmapTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 33px;
  font-weight: 600;
`;

const Divider = styled.hr`
  border: none;
  height: 2px;
  background-color: #525252;
  margin: 1rem 0;
`;

const SessionList = styled.ul`
  list-style-type: none;
  max-height: calc(100vh - 280px);
  overflow-y: auto;
  padding-right: 20px;
  overflow-x: hidden;

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

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-right: 12px;
  padding-bottom: 13px;
`;

const StatusIcon = styled.div`
  position: absolute;
  top: 13px;
  right: 12px;
`;

const SessionItem = styled.li<{ status: 'completed' | 'current' | 'upcoming'; selected: boolean }>`
    width: 100%;
    height: 113px;
    padding-left: 12px;
    margin-left: 5px;
    padding-top: 13px;
    margin-bottom: 1rem;
    background: ${(props) => {
        switch (props.status) {
            case 'completed':
                return '#F6F9F3';
            case 'current':
                return '#90D8BF';
            case 'upcoming':
                return '#F2F2F2';
        }
    }};
    border-radius: 13px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    box-shadow: ${props => props.selected ? '0px 4px 5px rgba(0, 0, 0, 0.25)' : 'none'};
    position: relative;
`;

const SessionTitleContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;

const Number = styled.div`
    font-size: 26px;
    color: #3C3C3C;
    font-weight: 600;
`;

const Title = styled.div`
    margin-left: 7px;
    font-size: 23px;
    color: #000000;
    font-weight: 600;
`;

const SessionDescription = styled.div`
    font-size: 18px;
    color: #3C3C3C;
    font-weight: 400;
`;

const Note = styled.div`
  margin-top: 1rem;
`;

const ContentDivider = styled.hr`
  border: none;
  height: 2px;
  background-color: #525252;
  margin: 67px 0 0px 0;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  border-radius: 13px;
`;

const ModalContent = styled.div`
  background: #FFFFFF;
  padding: 40px;
  border-radius: 13px;
  width: 450px;
  text-align: center;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15));
`;

const ModalTitle = styled.h3`
  font-size: 26px;
  font-weight: 600;
  color: #3C3C3C;
  margin-bottom: 15px;
`;

const ModalDescription = styled.p`
  font-size: 18px;
  color: #525252;
  margin-bottom: 30px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ModalButton = styled.button`
  width: 122px;
  height: 50px;
  border: none;
  border-radius: 25px;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  filter: drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.2));
  
  &.cancel {
    background: #E9E9E9;
    color: #141414;
    
    &:hover {
      background: #d9d9d9;
    }
  }
  
  &.confirm {
    background: #FF9494;
    color: #000000;
    
    &:hover {
      background: #FF7070;
    }
  }
`;

interface UserEntity {
  id: number;
  username: string;
  password: null;
}

interface SessionItem {
  seq: number;
  topic: string;
  description: string;
  start_date: string;
  deadline: string;
  note: string | null;
}

interface SessionData {
  result: SessionItem[];
}

interface RoadmapData {
  roadmapId: number;
  userEntity: UserEntity;
  achieved: number;
  clear: boolean;
  sessionData: SessionData;
}

export default function HomePage() {
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTopic, setEditedTopic] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const initialRoadmapData: RoadmapData = {
    roadmapId: 1,
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
          start_date: "2024-03-20",
          deadline: "2024-03-25",
          note: null
        },
        {
          seq: 2,
          topic: "피킹 연습하기",
          description: "크로매틱 연습을 통해 300 bpm까지 연습해보세요!",
          start_date: "2024-03-26",
          deadline: "2024-03-30",
          note: null
        },
        {
          seq: 3,
          topic: "노래 연주해보기",
          description: "반짝반짝 작은별 노래를 연주해보며, 사용감을 익히세요!",
          start_date: "2024-04-01",
          deadline: "2024-04-05",
          note: null
        },
        {
          seq: 4,
          topic: "해머링 & 풀링",
          description: "해머링과 풀링을 연습하여 원손의 다양한 기술을 습득해보세요!",
          start_date: "2024-04-06",
          deadline: "2024-04-10",
          note: null
        },
        {
          seq: 5,
          topic: "스윕 피킹",
          description: "설명설명설명설명설명설명설명설명설명",
          start_date: "2024-04-11",
          deadline: "2024-04-15",
          note: null
        },
        {
          seq: 6,
          topic: "기타 줄 끊보기",
          description: "기타 줄을 4개로 만들어보아요!",
          start_date: "2024-04-16",
          deadline: "2024-04-20",
          note: null
        }
      ]
    }
  };

  const [roadmapData, setRoadmapData] = useState<RoadmapData>(initialRoadmapData);

  const handleNoteChange = (note: string) => {
    if (selectedSession === null) return;
    
    setRoadmapData(prev => {
      const newData = { ...prev };
      newData.sessionData.result[selectedSession].note = note;
      return newData;
    });
  };

  const handleEditClick = () => {
    if (selectedSession !== null) {
      setEditedTopic(roadmapData.sessionData.result[selectedSession].topic);
      setEditedDescription(roadmapData.sessionData.result[selectedSession].description);
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (selectedSession === null) return;
    
    setRoadmapData(prev => {
      const newData = { ...prev };
      newData.sessionData.result[selectedSession].topic = editedTopic;
      newData.sessionData.result[selectedSession].description = editedDescription;
      return newData;
    });
    setIsEditing(false);
  };

  const handleSessionComplete = () => {
    if (selectedSession === roadmapData.achieved) {
      setRoadmapData(prev => ({
        ...prev,
        achieved: prev.achieved + 1
      }));
      if (selectedSession < roadmapData.sessionData.result.length - 1) {
        setSelectedSession(selectedSession + 1);
      }
      setIsEditing(false);
    }
  };

  const handleSessionCancel = () => {
    setRoadmapData(prev => ({
      ...prev,
      achieved: prev.achieved - 1
    }));
  };

  const handleAddSession = () => {
    if (selectedSession === null) return;
    
    const newSession: SessionItem = {
      seq: roadmapData.sessionData.result[selectedSession].seq + 1,
      topic: "새로운 세션",
      description: "설명을 입력하세요",
      start_date: "2024-04-21",
      deadline: "2024-04-25",
      note: null
    };
    
    setRoadmapData(prev => {
      const updatedSessions = [
        ...prev.sessionData.result.slice(0, selectedSession + 1),
        newSession,
        ...prev.sessionData.result.slice(selectedSession + 1).map(session => ({
          ...session,
          seq: session.seq + 1
        }))
      ];
      
      return {
        ...prev,
        sessionData: {
          ...prev.sessionData,
          result: updatedSessions
        }
      };
    });

    setSelectedSession(selectedSession + 1);
    setIsEditing(true);
    setEditedTopic("새로운 세션");
    setEditedDescription("설명을 입력하세요");
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedSession === null) return;
    
    setRoadmapData(prev => {
      const updatedSessions = prev.sessionData.result.filter((_, index) => index !== selectedSession);
      // 세션 번호 재정렬
      const reorderedSessions = updatedSessions.map((session, index) => ({
        ...session,
        seq: index + 1
      }));
      
      return {
        ...prev,
        sessionData: {
          ...prev.sessionData,
          result: reorderedSessions
        },
        achieved: selectedSession < prev.achieved ? prev.achieved - 1 : prev.achieved
      };
    });
    
    setShowDeleteModal(false);
    setSelectedSession(null);
  };

  return (
    <Container>
      <ProfileButton />
      <PageName>내 로드맵</PageName>
      <ContentContainer>
        <Sidebar>
          <RoadmapTitle>일렉기타</RoadmapTitle>
          <Divider />
          <SessionList>
            {roadmapData.sessionData.result.map((session, index) => (
              <SessionItem
                key={index}
                status={
                  index < roadmapData.achieved
                    ? 'completed'
                    : index === roadmapData.achieved
                    ? 'current'
                    : 'upcoming'
                }
                selected={selectedSession === index}
                onClick={() => {
                  setSelectedSession(index);
                  setIsEditing(false);
                }}
              >
                  <SessionTitleContainer>
                      <Number>{session.seq < 10 ? '0' + session.seq : session.seq}</Number>
                      <Title>{session.topic}</Title>
                  </SessionTitleContainer>
                  <SessionDescription>{session.description}</SessionDescription>
                  {index < roadmapData.achieved && (
                    <StatusIcon>
                      <img src="/icons/completed.svg" alt="completed" />
                    </StatusIcon>
                  )}
                  <IconContainer>
                    <div></div>
                    {session.note && <img src="/icons/memo.svg" alt="memo" />}
                  </IconContainer>
              </SessionItem>
            ))}
          </SessionList>
        </Sidebar>  
        <Content>
          {selectedSession !== null && (
            <>
              <ContentHeader>
                <CloseIcon onClick={() => setSelectedSession(null)}>
                  <img src="/icons/close.svg" alt="back" />
                </CloseIcon>
                <HeaderIcons>
                  {isEditing ? (
                    <span onClick={handleSaveEdit}>
                      <img src="/icons/save.svg" alt="save" />
                    </span>
                  ) : (
                    <>
                      <span onClick={handleAddSession}>
                        <img src="/icons/add.svg" alt="add" />
                      </span>
                      <span onClick={handleEditClick}>
                        <img src="/icons/edit.svg" alt="edit" />
                      </span>
                    </>
                  )}
                  <span onClick={handleDeleteClick}><img src="/icons/delete.svg" alt="delete" /></span>
                </HeaderIcons>
                <HeaderTitle>
                  {isEditing ? (
                    <input
                      value={editedTopic}
                      onChange={(e) => setEditedTopic(e.target.value)}
                      style={{
                        fontSize: '26px',
                        fontWeight: '600',
                        width: '100%',
                        border: 'none',
                        background: '#F2F2F2',
                        padding: '5px'
                      }}
                    />
                  ) : (
                    (roadmapData.sessionData.result[selectedSession].seq < 10 ? '0' : '') + 
                    roadmapData.sessionData.result[selectedSession].seq + 
                    ' ' + 
                    roadmapData.sessionData.result[selectedSession].topic
                  )}
                </HeaderTitle>
              </ContentHeader>
              <ContentBody>
                {isEditing ? (
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '100px',
                      border: 'none',
                      background: '#FFFFFF',
                      padding: '10px',
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}
                  />
                ) : (
                  <p>{roadmapData.sessionData.result[selectedSession].description}</p>
                )}
                <ContentDivider />
                <MemoTitle>메모</MemoTitle>
                <MemoContent
                  value={roadmapData.sessionData.result[selectedSession].note || ''}
                  onChange={(e) => handleNoteChange(e.target.value)}
                  placeholder="메모를 입력하세요"
                />
              </ContentBody>
              {selectedSession === roadmapData.achieved - 1 ? (
                <CancelButton 
                  isActive={true}
                  onClick={handleSessionCancel}
                >
                  세션 취소
                </CancelButton>
              ) : (
                <SaveButton 
                  isActive={selectedSession === roadmapData.achieved}
                  onClick={handleSessionComplete}
                >
                  세션 완료
                </SaveButton>
              )}
            </>
          )}
        </Content>
      </ContentContainer>
      {showDeleteModal && (
        <Modal>
          <ModalContent>
            <ModalTitle>세션을 삭제하시겠습니까?</ModalTitle>
            <ModalDescription>이 작업은 되돌릴 수 없습니다.</ModalDescription>
            <ModalButtons>
              <ModalButton className="cancel" onClick={() => setShowDeleteModal(false)}>
                취소
              </ModalButton>
              <ModalButton className="confirm" onClick={handleDeleteConfirm}>
                삭제
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}
