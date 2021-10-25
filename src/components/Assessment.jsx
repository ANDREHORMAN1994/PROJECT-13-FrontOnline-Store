import React from 'react';
import PropTypes from 'prop-types';

class Assessment extends React.Component {
  render() {
    const { props } = this.props;
    return (
      <div>
        <div>
          { props.email }
          { props.note }
        </div>
        <div>
          { props.message }
        </div>
      </div>
    );
  }
}

Assessment.propTypes = {
  props: PropTypes.shape({
    email: PropTypes.string,
    note: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

export default Assessment;
