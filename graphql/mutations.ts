import { gql } from '@apollo/client';

export const USER_SIGN_IN = gql`
  mutation MyMutation($email: String = "", $password: String = "") {
    UserSignIn(email: $email, password: $password) {
      id
      token
    }
  }
`;
