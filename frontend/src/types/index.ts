export type Tweeah = {
  id: number;
  body: string;
  created_at: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  iliked: boolean;
  likes_count: number;
  replies_count: number;
  bookmarks_count: number;
  ibookmarked: boolean
};

export type ListResponse = {
  results?: Tweeah[],
  total_pages: number,
  current_page: number,
}

export type TweeahResponse = {
  results?: Tweeah,
  thread?: Tweeah[],
}

export type TokenType = {
  refresh: string,
  access: string,
}

export type AccessToken = {
  exp: number,
  iat: number,
  jti: string,
  name: string,
  token_type: string,
  user_id: number,
}