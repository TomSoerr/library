import './form.css';
import { _ } from '../../helper';
import chip from '../chip/chip';

/**
 *
 * @param {Object} param0
 * @param {string} param0.type - The type of the input field
 * @param {string} param0.label - The label for the input field
 * @param {string} param0.value - The value of the input field
 * @param {string} param0.name - The name attribute of the input field
 * @param {boolean} param0.required - If the input field is required
 * @param {string} param0.attr - Additional attributes for the input field
 * @returns
 */
const input = ({ type, label, value, name, required, attr = '' }) => {
  // Concat string for attributes
  const attributes = String.prototype.concat(
    `type="${type}"`,
    `::name="${name}"`,
    '::placeholder=" "',
    `${required ? '::required=""' : ''}`,
    `${attr}`,
  );

  // Special return for textarea
  if (type === 'textarea') {
    const textareaEL = _(`textarea.none#${name}[name="${name}"${attr}]`);
    if (value != null) {
      textareaEL.textContent = value;
    }
    return _(`label[for="${name}"]`, [_(`span{${label}}`), textareaEL]);
  }

  // All other input types
  const inputEL = _(`input.none[${attributes}]`);
  if (value != null) {
    inputEL.value = value;
  }
  return _(`label[for="${name}"]`, [_(`span{${label}}`), inputEL]);
};

/**
 *
 * @param {*} param0
 * @param {Object} param0.data - The data for the form fields
 * @param {Object} param0.button - The button for the form submission
 * @returns {HTMLElement}
 */
const form = ({ data, button }) => {
  // Regex pattern for ISBN numbers
  let ISBNPattern = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d\-]+$/;
  ISBNPattern = ISBNPattern.toString();

  // Regex pattern for default text fields
  let namePattern = /^.{2,}$/;
  namePattern = namePattern.toString();

  // Use the input and chip functions to create the form
  const HTMLElement = _(
    `form.book-data${data ? `[data-id="${data.id}"]` : ''}`,
    [
      _('div.chips-row', [
        chip({
          type: 'checkbox',
          label: 'Gelesen',
          name: 'gelesen',
          checked: data ? data.gelesen : false,
          icon: '\\f53e',
        }),
        chip({
          type: 'checkbox',
          label: 'Favorit',
          name: 'favorit',
          checked: data ? data.favorit : false,
          icon: '\\e87d',
        }),
        chip({
          type: 'checkbox',
          label: 'Leseexemplar',
          name: 'leseexemplar',
          checked: data ? data.leseexemplar : false,
          icon: '\\e8b1',
        }),
        chip({
          type: 'checkbox',
          label: 'Reihe',
          name: 'ist_reihe',
          checked: data ? data.ist_reihe : false,
          icon: '\\e02e',
        }),
        chip({
          type: 'checkbox',
          label: 'Verliehen',
          name: 'verliehen',
          checked: data ? data.verliehen : false,
          icon: '\\e7fd',
        }),
      ]),
      input({
        type: 'text',
        label: 'Titel*',
        name: 'titel',
        value: data ? data.titel : '',
        required: true,
        attr: `::pattern="${namePattern.slice(1, -1)}"`,
      }),
      input({
        type: 'text',
        label: 'Autor*',
        name: 'autor',
        value: data ? data.autor : '',
        required: true,
        attr: `::pattern="${namePattern.slice(1, -1)}"`,
      }),
      _('div.form-row', [
        input({
          type: 'text',
          label: 'Genre*',
          name: 'genre',
          value: data ? data.genre : '',
          required: true,
          attr: `::pattern="${namePattern.slice(1, -1)}"`,
        }),
        input({
          type: 'date',
          label: 'Beendet am',
          name: 'beendet_am',
          value: data ? data.beendet_am : '',
        }),
      ]),
      _('div.form-row', [
        input({
          type: 'number',
          label: 'Spice*',
          name: 'spice',
          value: data != null ? data.spice : '',
          required: true,
          attr: '::min="0"::max="5"::step="1"',
        }),
        input({
          type: 'number',
          label: 'Bewertung*',
          name: 'bewertung',
          value: data != null ? data.bewertung : '',
          required: true,
          attr: '::min="0"::max="5"::step="1"',
        }),
      ]),
      _('div.form-row', [
        input({
          type: 'text',
          label: 'ISBN',
          name: 'isbn',
          value: data ? data.isbn : '',
          attr: `::pattern="${ISBNPattern.slice(1, -1)}"`,
        }),
        input({
          type: 'text',
          label: 'Verlag',
          name: 'verlag',
          value: data ? data.verlag : '',
          attr: `::pattern="${namePattern.slice(1, -1)}"`,
        }),
      ]),
      _('div.form-row', [
        input({
          type: 'number',
          label: 'Band',
          name: 'band',
          value: data ? data.band : '',
          attr: '::min="1"::step="1"',
        }),
        input({
          type: 'text',
          label: 'Verliehen an',
          name: 'verliehen_an',
          value: data ? data.verliehen_an : '',
          attr: `::pattern="${namePattern.slice(1, -1)}"`,
        }),
      ]),
      input({
        type: 'textarea',
        label: 'Anmerkungen',
        name: 'anmerkung',
        value: data ? data.anmerkung : '',
        attr: '::rows="4"',
      }),
      _('div.button-row', button),
    ],
  );

  return HTMLElement;
};

export default form;
