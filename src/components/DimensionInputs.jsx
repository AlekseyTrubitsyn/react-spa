import React from 'react';

import DimensionInput from './DimensionInput';

function DimensionInputs(props) {
  const CLASS_NAME = 'polygon-block';
  const CLASS_NAME_GROUP = 'polygon-block__form';
  const CLASS_NAME_FORM = 'polygon-block__form';
  const CLASS_NAME_BUTTON = 'polygon-block__button';

  // TODO add class "blocked" for fieldset
  // TODO add functions addInput and removeInput

  return (
    <form action="" className={ CLASS_NAME_FORM }>
      <fieldset>
        <button className={ CLASS_NAME_BUTTON }
                onClick={ props.addInput }>+</button>
        <button className={ CLASS_NAME_BUTTON }
                onClick={ props.removeInput }>-</button>
      </fieldset>
      <fieldset>
        {props.dimensions.map(item =>
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
