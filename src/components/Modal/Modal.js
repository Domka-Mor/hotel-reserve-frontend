import React from 'react';

import './Modal.css';

const modal = (props) => (
  <div className="modal-room">
    <div className='container-modal'>
      <section className="modal__content">{props.children}</section>
      <section className="modal__actions">
        {props.canCancel && (
          <button className="button-modal" onClick={props.onCancel}>
            Cancel
          </button>
        )}
        {props.canConfirm && (
          <button className="button-modal" onClick={props.onConfirm}>
            {props.confirmText}
          </button>
        )}
      </section>
    </div>
  </div>
);

export default modal;