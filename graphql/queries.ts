import { gql } from '@apollo/client';

export const USER_PROFILE = gql`
  query UserProfile($id: uuid!) {
    users_by_pk(id: $id) {
      created_at
      displayName
      email
      id
      profilePictureUrl
      phoneNumber
      isPhoneNumberVerified
      isEmailVerified
    }
  }
`;
