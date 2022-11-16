import React, { ReactNode } from 'react';
import { Skeleton } from '@mui/material';
import { Page } from '../clients/api/paginations';

type Props<T> = {
  children: ReactNode;
  data: Page<T> | undefined;
  isLoading: boolean;
  isError: boolean;
  skeletonHeight?: number;
  skeletonItems?: number;
};

export default function ReactQueryLoader<T>(props: Props<T>) {
  const skeletonItems = props.skeletonItems ?? 15;
  const skeletonHeight = props.skeletonHeight ?? 75;

  return (
    <>
      {props.isLoading ? (
        <>
          {[...Array(skeletonItems)].map((item, i) => (
            <Skeleton key={i} variant="rectangular" height={skeletonHeight} />
          ))}
        </>
      ) : props.isError ? (
        'Error!'
      ) : props.data ? (
        props.children
      ) : null}
    </>
  );
}
