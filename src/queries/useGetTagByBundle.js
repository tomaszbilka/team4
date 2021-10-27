import { gql, useLazyQuery } from '@apollo/client';

export const GET_TAGS_BY_BUNDLE = gql`
  query GetTagsByBundle($id: MongoID!) {
    tagBundleById(_id: $id) {
      tags {
        name
      }
    }
  }
`;

const useGetTagBundles = () => {
  const [getBundleTags, { data, loading }] = useLazyQuery(GET_TAGS_BY_BUNDLE);

  return { getBundleTags, bundleTags: data?.tagBundleById?.tags, loading };
};

export default useGetTagBundles;
