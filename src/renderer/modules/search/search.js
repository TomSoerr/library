import './search.css';
import { _ } from '../../helper';

const searchChip = (() => {
  const input = _('input.none[type="text"::placeholder="Suchen"]');
  const button = _(
    'input.ms-within.none#search[type="radio"::name="order"::value="search"]',
  );
  const HTMLElement = _(
    'label.search-chip[for="search"::title="Durchsuche Titel, Autor, ISBN, Genre, Anmerkung und Verliehen an"]',
    [input, button],
  );

  return { HTMLElement, input, button };
})();

export default searchChip;
