import React from 'react';

import DimensionInput from './DimensionInput';

function DimensionInputs(props) {
  const CLASS_NAME = 'polygon-block';
  const CLASS_NAME_FORM = 'polygon-block__form';
  const CLASS_NAME_GROUP = 'polygon-block__fieldset';
  const CLASS_NAME_BUTTON = 'polygon-block__button';
  const CLASS_NAME_GROUP_OVERFLOWED = 'polygon-block__fieldset--blocked';

  let overflowed = (props.dimensions.length > 10);
  let groupClassName = CLASS_NAME_GROUP + ((overflowed) ? (' ' + CLASS_NAME_GROUP_OVERFLOWED) : '');

  function addInput(e) {
    e.preventDefault();
    props.addDimension();
  }

  function removeInput(e) {
    e.preventDefault();
    props.removeDimension();
  }

  return (
    <form action="" className={ CLASS_NAME_FORM }>
      <fieldset className={ CLASS_NAME_GROUP }>
        <button className={ CLASS_NAME_BUTTON }
                onClick={ addInput }>+</button>
        <button className={ CLASS_NAME_BUTTON }
                onClick={ removeInput }>-</button>
      </fieldset>
      <fieldset className={ groupClassName }>
        {props.dimensions.slice(0, 10).map(item =>
          <DimensionInput
            key={ item.id }
            id={ item.id }
            value={ item.value }
            onChange={ props.onChange }
          />
        )}
      </fieldset>
    </form>
  )
}

export default DimensionInputs;
