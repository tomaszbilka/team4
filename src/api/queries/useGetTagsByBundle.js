import { gql, useLazyQuery } from '@apollo/client';

export const GET_TAGS_BY_BUNDLE = gql`
  query GetTagsByBundle($id: MongoID!) {
    tagBundleById(_id: $id) {
      tags {
        _id
        name
      }
    }
  }
`;

const useGetTagsByBundle = () => {
  const [getBundleTags, { data, loading }] = useLazyQuery(GET_TAGS_BY_BUNDLE, {
    fetchPolicy: 'network-only',
  });

  const tagList = data?.tagBundleById?.tags?.map(({ name }) => name);

  return { getBundleTags, bundleTags: tagList, loading };
};

export default useGetTagsByBundle;
