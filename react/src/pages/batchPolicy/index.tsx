import * as React from 'react';
import SearchForm from './searchForm';
import Table from './table';

class Query extends React.Component {
  render() {
    return (
      <div>
        <SearchForm />
        <Table />
      </div>
    );
  }
}

export default Query;
