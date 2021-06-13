import React, { Component, Fragment } from 'react';
import ReactPaginate from 'react-paginate';
import Loader from './loader';
import Table from './table';
import Search from './search';
import PersonDetails from './personDetails';
import _ from 'lodash';

const url = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

class App extends Component {
  state = {
    isLoading: false,
    data: [],
    error: null,
    sort: 'asc',
    sortField: '',
    person: null,
    currentPage: 0,
    pageSize: 50,
    searchTerm: null
  };

  componentDidMount() {
    this.fetchData(url);
  }

  fetchData = async url => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ data, isLoading: false });
    } catch (err) {
      this.setState({ error: err, isLoading: false });
    }
  };

  onSort = sortField => {
    const { data, sort } = this.state;

    const sortReverse = sort === 'asc' ? 'desc' : 'asc';

    let ordered = _.orderBy(data, sortField, sortReverse);

    this.setState({
      data: ordered,
      sort: sortReverse,
      sortField
    });
  };

  getPaginatedData = () => {
    const { currentPage, data, pageSize } = this.state;
    if (data.length === 0) return [];

    const filteredData = this.getFilteredData();

    const displayData = _.chunk(filteredData, pageSize)[currentPage];
    return displayData;
  };

  getFilteredData = () => {
    const { data, searchTerm } = this.state;

    if (data.length === 0) return [];
    if (!searchTerm) return data;

    const search = searchTerm.toLowerCase();

    const filteredData = data.filter(({ firstName, lastName }) => {
      return (
        firstName.toLowerCase().includes(search) ||
        lastName.toLowerCase().includes(search)
      );
    });

    return filteredData;
  };

  onSelect = person => {
    this.setState({ person });
  };

  handlePageClick = data => {
    let selected = data.selected;
    this.setState({ currentPage: selected });
  };

  onSearch = searchTerm => {
    this.setState({ searchTerm, currentPage: 0 });
  };

  getPageCount = data => {
    const { pageSize } = this.state;
    const pageCount = Math.ceil(data.length / pageSize);

    return pageCount;
  };

  render() {
    const { isLoading, error, sort, sortField, person, pageSize } = this.state;

    return (
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : (
          <Fragment>
            <Search onSearch={this.onSearch} />
            <Table
              data={this.getPaginatedData()}
              onSort={this.onSort}
              onSelect={this.onSelect}
              sort={sort}
              sortField={sortField}
              error={error}
            />
          </Fragment>
        )}

        {person && <PersonDetails person={person} />}

        {this.getFilteredData().length > pageSize && (
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.getPageCount(this.getFilteredData())}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        )}
      </div>
    );
  }
}

export default App;
