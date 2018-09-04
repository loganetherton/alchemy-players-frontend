/**
 *
 * ToggleOption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const ToggleOption = ({ value, message }) => (
  <option value={value}>{message ? message : value}</option>
);

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default injectIntl(ToggleOption);
