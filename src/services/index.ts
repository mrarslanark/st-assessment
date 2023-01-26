import {messages} from '../constants';
import {AudienceType} from '../screens/Audience';

export type GitHubDataType = {
  username: string;
  avatar: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  followers: {
    url: string;
    count: number;
  };
  following: {
    url: string;
    count: number;
  };
};

export async function fetchUser(username: string): Promise<GitHubDataType> {
  const url = `https://api.github.com/users/${username}`;
  const response = await fetch(url, {method: 'GET'});
  if (!response.ok) {
    // Not Found
    throw new Error('User not found');
  }
  const data = await response.json();
  const model: GitHubDataType = {
    name: data.name,
    username: data.login,
    avatar: data.avatar_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    description: data.bio,
    followers: {
      count: data.followers,
      url: data.followers_url,
    },
    following: {
      count: data.following,
      url: data.following_url,
    },
  };
  return model;
}

export async function fetchAudience(
  username: string,
  type: 'following' | 'followers',
  pageCount: number,
): Promise<AudienceType> {
  const url = `https://api.github.com/users/${username}/${type}?per_page=${
    pageCount * 10
  }`;
  const request = await fetch(url, {method: 'GET'});
  if (!request.ok) {
    throw new Error(messages.GENERAL_ERROR_MESSAGE);
  }
  const json = await request.json();
  return json.map((user: any) => {
    return {
      username: user.login,
      avatar: user.avatar_url,
      profile: user.url,
    };
  });
}
