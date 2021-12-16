import { gql } from '@apollo/client';

export const CREATE_USER_PROFILE = gql`
  mutation UserProfile($email: String, $id: String) {
    insert_users_one(object: { email: $email, id: $id }) {
      id
    }
  }
`;
