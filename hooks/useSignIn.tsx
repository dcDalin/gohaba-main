import { gql, useMutation } from '@apollo/client';

export const USER_SIGN_IN = gql`
  mutation MyMutation($email: String = "", $password: String = "") {
    UserSignIn(email: $email, password: $password) {
      id
      token
    }
  }
`;

const useSignIn = () => {
  const [signInUser, { data, loading, error }] = useMutation(USER_SIGN_IN, {
    onError: (err) => {
      console.log('Error: ', err);
    }
  });
  return { signInUser, data, loading, error };
};

export default useSignIn;
