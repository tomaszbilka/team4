import { gql, useMutation } from '@apollo/client';
/* eslint-disable */

import { ENTRY_QUERY } from '../queries/useGetEntries';

const REMOVE_ENTRY_BY_ID = gql`
  mutation RemoveEntryById($id: MongoID) {
    entryRemoveById(id: $id) {
      record {
        tag {
          name
        }
      }
    }
  }
`;

const useRemoveEntry = () => {
  const [removeEntryById, test] = useMutation(REMOVE_ENTRY_BY_ID, {
    refetchQueries: [ENTRY_QUERY, 'GetEntries'],
  });

  console.log(test);

  return { removeEntryById };
};

export default useRemoveEntry;
