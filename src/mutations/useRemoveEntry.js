import { gql, useMutation } from '@apollo/client';

import { ENTRY_QUERY } from '../queries/useGetEntries';

const REMOVE_ENTRY_BY_ID = gql`
  mutation RemoveEntryById($id: MongoID!) {
    entryRemoveById(_id: $id) {
      record {
        tag {
          name
        }
      }
    }
  }
`;

const useRemoveEntry = () => {
  const [removeEntryById, { error }] = useMutation(REMOVE_ENTRY_BY_ID, {
    refetchQueries: [ENTRY_QUERY, 'GetEntries'],
  });

  return {
    removeEntryById,
    removeError: error && 'Nie udało się usunąć entry',
  };
};

export default useRemoveEntry;
