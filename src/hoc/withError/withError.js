import React from 'react';
import Error from '../../components/error';

const withError = Component => ({ error, ...rest }) =>
  error ? <Error error={error} /> : <Component {...rest} />;

export default withError;
