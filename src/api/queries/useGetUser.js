import { gql, useQuery } from '@apollo/client';

const PROFILE_QUERY = gql`
  query GetCurrentUser {
    getProfile {
      _id
      oauthId
    }
  }
`;

const useGetUser = ({ auth }) => {
  const { data, loading } = useQuery(PROFILE_QUERY);

  if (auth) {
    const username =
      data?.getProfile?.oauthId !== 'open-user' && data?.getProfile?.oauthId;

    return { username, loading };
  }

  return { data, loading };
};

export default useGetUser;
