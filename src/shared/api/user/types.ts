export interface UserInfoResponse {
  nickname: string;
  introduce: string;
  email: string;
  isProfileImageExist: boolean;
}

export interface UserUpdateRequest {
  nickname: string;
  introduce: string;
}

export interface IsExistNicknameResponse {
  nickname: string;
  exist: boolean;
}
