import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({pages, page, keyword = '', isAdmin}) => {
  return (
      <>
    {pages > 1 ? (
        <Pagination>
            {[...Array(pages).keys()].map((x) => {
                return <LinkContainer key  = {x+1} to = {!isAdmin ? keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}` : `/admin/page/${x+1}`}>
                    <Pagination.Item active = {page === x + 1}>
                        {x+1}
                    </Pagination.Item>
                </LinkContainer>
            })}
        </Pagination>
    ) : ''}
    </>
  )
}

export default Paginate