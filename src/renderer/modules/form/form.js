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
    `,name="${name}"`,
    `${required ? ',required=""' : ''}`,
    `${checked ? ',checked=""' : ''}`,
    `${attr}`,
  );
  if (type === 'textarea') {
    const textareaEL = _(`textarea[name="${name}"${attr}]`);
    if (value) {
      textareaEL.textContent = value;
    }
    return _(`label{${label}}`, textareaEL);
  }

  const inputEL = _(`input[${attributes}]`);
  if (value) {
    inputEL.value = value;
  }
  return _(`label{${label}}`, inputEL);
};

/**
 *
 * @param {*} param0
 * @param {Object} param0.data - The data for the form fields
 * @param {Object} param0.button - The button for the form submission
 * @returns {HTMLElement}
 */
const form = ({ data, button }) => {
  const HTMLElement = _(
    `form.book-data${data ? `[data-id="${data.id}"]` : ''}`,
    [
      ...[
        {
          type: 'checkbox',
          label: 'Gelesen',
          name: 'gelesen',
          checked: data ? data.gelesen : false,
        },
        {
          type: 'checkbox',
          label: 'Favorit',
          name: 'favorit',
          checked: data ? data.favorit : false,
        },
        {
          type: 'checkbox',
          label: 'Leseexemplar',
          name: 'leseexemplar',
          checked: data ? data.leseexemplar : false,
        },
        {
          type: 'checkbox',
          label: 'Ist Reihe',
          name: 'ist_reihe',
          checked: data ? data.ist_reihe : false,
        },
        {
          type: 'checkbox',
          label: 'Verliehen',
          name: 'verliehen',
          checked: data ? data.verliehen : false,
        },
        {
          type: 'text',
          label: 'Titel*',
          name: 'titel',
          value: data ? data.titel : null,
          required: true,
        },
        {
          type: 'text',
          label: 'Autor*',
          name: 'autor',
          value: data ? data.autor : null,
          required: true,
        },
        {
          type: 'number',
          label: 'Spice*',
          name: 'spice',
          value: data ? data.spice : null,
          required: true,
          attr: ',min="1",max="5",step="1"',
        },
        {
          type: 'number',
          label: 'Bewertung*',
          name: 'bewertung',
          value: data ? data.bewertung : null,
          required: true,
          attr: ',min="1",max="5",step="1"',
        },
        {
          type: 'text',
          label: 'Genre*',
          name: 'genre',
          value: data ? data.genre : null,
          required: true,
        },
        {
          type: 'date',
          label: 'Beendet am',
          name: 'beendet_am',
          value: data ? data.beendet_am : null,
        },
        {
          type: 'text',
          label: 'ISBN',
          name: 'isbn',
          value: data ? data.isbn : null,
        },
        {
          type: 'text',
          label: 'Verlag',
          name: 'verlag',
          value: data ? data.verlag : null,
        },
        {
          type: 'number',
          label: 'Band',
          name: 'band',
          value: data ? data.band : null,
          attr: ',min="1",step="1"',
        },
        {
          type: 'text',
          label: 'Verliehen an',
          name: 'verliehen_an',
          value: data ? data.verliehen_an : null,
        },
        {
          type: 'textarea',
          label: 'Anmerkungen',
          name: 'anmerkung',
          value: data ? data.anmerkung : null,
          attr: ',rows="4"',
        },
      ].map((field) => input(field)),

      button,
    ],
  );

  return HTMLElement;
};

export default form;
