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
const input = ({ type, label, value, name, required, checked, attr = '' }) => {
  const attributes = String.prototype.concat(
    `type="${type}"`,
    `::name="${name}"`,
    `::id="${name}"`,
    '::placeholder=" "',
    `${required ? '::required=""' : ''}`,
    `${checked ? '::checked=""' : ''}`,
    `${attr}`,
  );
  if (type === 'textarea') {
    const textareaEL = _(`textarea.none[name="${name}"${attr}]`);
    if (value) {
      textareaEL.textContent = value;
    }
    return _(`label[for="${name}"]`, [_(`span{${label}}`), textareaEL]);
  }

  const inputEL = _(`input.none[${attributes}]`);
  if (value) {
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
  let ISBNPattern = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d\-]+$/;
  ISBNPattern = ISBNPattern.toString();

  let namePattern = /^.{2,}$/;
  namePattern = namePattern.toString();

  const HTMLElement = _(
    `form.book-data${data ? `[data-id="${data.id}"]` : ''}`,
    [
      _('div.form-row', [
        input({
          type: 'checkbox',
          label: 'Gelesen',
          name: 'gelesen',
          checked: data ? data.gelesen : false,
        }),
        input({
          type: 'checkbox',
          label: 'Favorit',
          name: 'favorit',
          checked: data ? data.favorit : false,
        }),
        input({
          type: 'checkbox',
          label: 'Leseexemplar',
          name: 'leseexemplar',
          checked: data ? data.leseexemplar : false,
        }),
        input({
          type: 'checkbox',
          label: 'Ist Reihe',
          name: 'ist_reihe',
          checked: data ? data.ist_reihe : false,
        }),
        input({
          type: 'checkbox',
          label: 'Verliehen',
          name: 'verliehen',
          checked: data ? data.verliehen : false,
        }),
      ]),
      input({
        type: 'text',
        label: 'Titel*',
        name: 'titel',
        value: data ? data.titel : null,
        required: true,
        attr: `::pattern="${namePattern.slice(1, -1)}"`,
      }),
      input({
        type: 'text',
        label: 'Autor*',
        name: 'autor',
        value: data ? data.autor : null,
        required: true,
        attr: `::pattern="${namePattern.slice(1, -1)}"`,
      }),
      _('div.form-row', [
        input({
          type: 'number',
          label: 'Spice*',
          name: 'spice',
          value: data ? data.spice : null,
          required: true,
          attr: '::min="1"::max="5"::step="1"',
        }),
        input({
          type: 'number',
          label: 'Bewertung*',
          name: 'bewertung',
          value: data ? data.bewertung : null,
          required: true,
          attr: '::min="1"::max="5"::step="1"',
        }),
      ]),
      _('div.form-row', [
        input({
          type: 'text',
          label: 'Genre*',
          name: 'genre',
          value: data ? data.genre : null,
          required: true,
          attr: `::pattern="${namePattern.slice(1, -1)}"`,
        }),
        input({
          type: 'date',
          label: 'Beendet am',
          name: 'beendet_am',
          value: data ? data.beendet_am : null,
        }),
      ]),
      _('div.form-row', [
        input({
          type: 'text',
          label: 'ISBN',
          name: 'isbn',
          value: data ? data.isbn : null,
          attr: `::pattern="${ISBNPattern.slice(1, -1)}"`,
        }),
        input({
          type: 'text',
          label: 'Verlag',
          name: 'verlag',
          value: data ? data.verlag : null,
          attr: `::pattern="${namePattern.slice(1, -1)}"`,
        }),
      ]),
      _('div.form-row', [
        input({
          type: 'number',
          label: 'Band',
          name: 'band',
          value: data ? data.band : null,
          attr: '::min="1"::step="1"',
        }),
        input({
          type: 'text',
          label: 'Verliehen an',
          name: 'verliehen_an',
          value: data ? data.verliehen_an : null,
          attr: `::pattern="${namePattern.slice(1, -1)}"`,
        }),
      ]),
      input({
        type: 'textarea',
        label: 'Anmerkungen',
        name: 'anmerkung',
        value: data ? data.anmerkung : null,
        attr: '::rows="4"',
      }),
      _('div.button-row', button),
    ],
  );

  return HTMLElement;
};

export default form;
