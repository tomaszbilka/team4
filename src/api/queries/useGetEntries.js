import { gql, useQuery } from '@apollo/client';

export const ENTRY_QUERY = gql`
  query GetEntries(
    $filter: FilterFindManyEntryInput
    $sort: SortFindManyEntryInput
  ) {
    entryMany(filter: $filter, sort: $sort) {
      _id
      startTime
      endTime
      date
      tagId
      order
      tag {
        name
        tagBundle {
          _id
          name
        }
      }
    }
  }
`;

const useGetEntries = (filter = {}) => {
  const { data, loading } = useQuery(ENTRY_QUERY, {
    variables: { filter, sort: 'ORDER_ASC' },
  });

  return { entries: data?.entryMany, loading };
};

export default useGetEntries;
