import React from 'react';
import Loader from './Loader';

const withLoader = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 2000); // Simulate loading for 2 seconds
    }

    render() {
      return (
        <div>
          {this.state.loading ? (
            <Loader />
          ) : (
            <WrappedComponent {...this.props} />
          )}
        </div>
      );
    }
  };
};

export default withLoader;
