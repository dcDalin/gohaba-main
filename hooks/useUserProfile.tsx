import { gql, useQuery } from '@apollo/client';

export const USER_PROFILE = gql`
  query GetUserProfile {
    UserProfile {
      success
      created_at
      displayName
      email
      id
      isEmailVerified
      isPhoneNumberVerified
      phoneNumber
      profilePictureUrl
    }
  }
`;

const useUserProfile = () => {
  const { loading, error, data, refetch, networkStatus } = useQuery(USER_PROFILE, {
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.log('Error fetching user profile: ', error);
    }
  });

  return { data, loading, error, refetch, networkStatus };
};

export default useUserProfile;
