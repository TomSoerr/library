import './search.css';
import { _ } from '../../helper';

/**
 * Search chip with input and button
 * @returns {Object} The search chip Object
 */
const searchChip = (() => {
  // Text input for the search chip
  const input = _('input.none[type="text"::placeholder="Suchen"]');

  // Radio button for the search chip
  // name is set to the same value as the other radio buttons inside the form
  const button = _(
    'input.ms-within.none#search[type="radio"::name="order"::value="search"]',
  );

  // Wrap the text input and button
  const HTMLElement = _(
    'label.search-chip[for="search"::title="Durchsuche Titel, Autor, ISBN, Genre, Anmerkung und Verliehen an"]',
    [input, button],
  );

  return { HTMLElement, input, button };
})();

export default searchChip;
