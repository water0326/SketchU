export interface UserEntity {
  id: number;
  username: string;
  password: null;
}

export interface SessionItem {
  seq: number;
  topic: string;
  description: string;
  start_date: string;
  deadline: string;
  note: string | null;
}


export interface RoadmapData {
  roadmapId: number;
  userEntity: UserEntity;
  achieved: number;
  clear: boolean;
  sessionData: SessionItem[];
}

export interface SaveRoadmapRequest {
  roadmapName: string;
  sessionData: {
    seq: number;
    topic: string;
    description: string;
    start_date: string;
    deadline: string;
    note: string | null;
  }[];
}

export interface SaveRoadmapResponse {
  success: boolean;
  error?: string;
}

export interface RoadmapListResponse {
  roadmapId: number;
  roadmapName: string;
  userEntity: UserEntity | null;
  achieved: number;
  clear: boolean;
  sessionData: SessionItem[];
}

export interface GetAllRoadmapsResponse {
  success: boolean;
  data?: RoadmapListResponse[];
  error?: string;
} 