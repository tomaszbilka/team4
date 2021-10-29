import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import classes from './pagination.module.css';
import { useParams } from 'react-router-dom';

import { useGetBundleById } from '../../api';

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

  const { data, loading } = useGetBundleById(id);
  const bundles = data?.tagBundleById.tags || [];

  const arrayBundles = bundles.map((el) => el.name);

  items = [...arrayBundles];

  if (loading) return <div>loading...</div>;

  return (
    <>
      <div className={classes.wrapper}>
        <h3>Tags:</h3>
        <PaginatedItems itemsPerPage={10} />
        {items.length === 0 && <p>No tags yet!</p>}
      </div>
    </>
  );
};

export default Pagination;
