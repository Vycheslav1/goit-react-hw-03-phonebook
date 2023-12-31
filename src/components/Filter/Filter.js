import { Label, InputFilter } from './FilterStyles.js';

import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';

const InputIdFilter = nanoid();

const Filter = ({ changeState }) => (
  <Label>
    Find contacts by name
    <InputFilter
      id={InputIdFilter}
      type="text"
      name="filtration"
      onInput={e => changeState(e)}
    />
  </Label>
);

export { Filter };

Filter.propTypes = {
  changeState: PropTypes.func.isRequired,
};
