import * as React from 'react';
import Loading from './routeLoading';

const Suspense = (Component: React.LazyExoticComponent<any>) => (props: any) => (
  <React.Suspense fallback={<Loading />}>
    <Component {...props} />
  </React.Suspense>
);

export default Suspense;
