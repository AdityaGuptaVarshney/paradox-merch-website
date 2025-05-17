import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
  mutation UserLogin($firebaseToken: String!) {
    userLogin(firebaseToken: $firebaseToken) {
      token
      member {
        id
        email
        profilePicURL
        name
        role
      }
    }
  }
`;

export interface UserLoginResponse {
  userLogin: {
    token: string;
    member: {
      id: string;
      email: string;
      profilePicURL: string | null;
      name: string;
      role: string;
    };
  };
} 