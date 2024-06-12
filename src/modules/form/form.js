import './form.css';
import { _ } from '../../helper';

const input = ({ type, label, value }) => {
  return _(
    `label{${label}}`,
    _(`input[type="${type}"]${value ? `[value="${value}"]` : ''}`),
  );
};

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
