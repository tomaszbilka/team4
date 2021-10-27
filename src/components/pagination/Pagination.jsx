import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import classes from './pagination.module.css';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_ALL_BUNDLES = gql`
  query tagBundleId($id: MongoID!) {
    tagBundleById(_id: $id) {
      tags {
        name
      }
    }
  }
`;

let items = [];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
          <div key={index} className={classes.elements}>
            <h5>{item}</h5>
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeClassName={classes.active}
        pageClassName={classes.element}
        containerClassName={classes.pagContainer}
        previousClassName={classes.elementControl}
        nextClassName={classes.elementControl}
      />
    </>
  );
}

const Pagination = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_ALL_BUNDLES, {
    variables: { id: id },
  });
  const bundles = data?.tagBundleById.tags || [];

  const arrayBundles = bundles.map((el) => el.name);

  items = [...arrayBundles];

  if (loading) return <div>loading...</div>;
  if (error) return <div>Oh no! Error!!</div>;

  return (
    <>
      <div className={classes.wrapper}>
        <h3>Pagination</h3>
        <PaginatedItems itemsPerPage={10} />
        {items.length === 0 && <p>No tags yet!</p>}
      </div>
    </>
  );
};

export default Pagination;
