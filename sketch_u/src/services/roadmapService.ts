import { SaveRoadmapRequest, SaveRoadmapResponse, GetAllRoadmapsResponse } from '@/types/roadmap';



export class RoadmapService {
  private static readonly BASE_URL = 'http://localhost:8081/api';

  static apiFetch = (endpoint: string, options?: RequestInit) => {
    return fetch(`${this.BASE_URL}${endpoint}`, options);
  };

  static async getAllRoadmaps(): Promise<GetAllRoadmapsResponse> {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await this.apiFetch(`/roadmap/getallroadmaps`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        throw new Error(`Failed to fetch roadmaps: ${response.statusText}`);
      }

      const data = await response.json();
      data.forEach((item: any) => {
        item.sessionData = JSON.parse(item.sessionData);
      });

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Failed to fetch roadmaps:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  static async saveRoadmap(data: SaveRoadmapRequest): Promise<SaveRoadmapResponse> {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      let tempData: any = data;
      tempData.sessionData = JSON.stringify(data.sessionData);

      const response = await this.apiFetch(`/roadmap/saveroadmap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(tempData)
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        throw new Error(`Failed to save roadmap: ${response.statusText}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to save roadmap:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  static async getRoadmap(roadmapId: number) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await this.apiFetch(`/roadmap/getroadmap?roadmapId=${roadmapId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        if (response.status === 404) {
          throw new Error('Roadmap not found');
        }
        throw new Error(`Failed to fetch roadmap: ${response.statusText}`);
      }

      const data = await response.json();
      data.sessionData = JSON.parse(data.sessionData);

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Failed to fetch roadmap:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
} 