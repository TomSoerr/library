import './form.css';
import { _ } from '../../helper';

/**
 *
 * @param {Object} param0
 * @param {string} param0.type - The type of the input field
 * @param {string} param0.label - The label for the input field
 * @param {string} param0.value - The value of the input field
 * @returns
 */
const input = ({ type, label, value }) => {
  return _(
    `label{${label}}`,
    _(`input[type="${type}"]${value ? `[value="${value}"]` : ''}`),
  );
};

/**
 *
 * @param {*} param0
 * @param {Object} param0.data - The data for the form fields
 * @param {Object} param0.button - The button for the form submission
 * @returns {HTMLElement}
 */
const form = ({ data, button }) => {
  const HTMLElement = _('form.book-data', [
    'Gelesen --- Leseexemplar --- Favorite --- Verliehen --- Reihe',
    input({
      type: 'text',
      label: 'Titel',
      value: data ? data.title : null,
    }),
    input({
      type: 'text',
      label: 'Autor',
      value: data ? data.author : null,
    }),
    input({
      type: 'number',
      label: 'Spice',
      value: data ? data.spice : null,
    }),
    input({
      type: 'number',
      label: 'Bewertung',
      value: data ? data.rating : null,
    }),
    input({
      type: 'text',
      label: 'Genre',
      value: data ? data.genre : null,
    }),
    input({
      type: 'date',
      label: 'Beendet am',
      value: data ? data.finished : null,
    }),
    input({
      type: 'text',
      label: 'ISBN',
      value: data ? data.isbn : null,
    }),
    input({
      type: 'number',
      label: 'Band',
      value: data ? data.volume : null,
    }),
    input({
      type: 'text',
      label: 'Anmerkungen',
      value: data ? data.notes : null,
    }),
    button,
  ]);
  return HTMLElement;
};

export default form;
