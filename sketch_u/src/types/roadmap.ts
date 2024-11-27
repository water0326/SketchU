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