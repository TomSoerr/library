import '../chip/chip.css';
import './dropdown.css';
import { _ } from '../../helper';

/**
 * Dropdown component that uses chips as options
 * @param {Object} param0
 * @param {string} param0.label - The label for the dropdown
 * @param {string} param0.name - The name attribute for the form
 * @param {Array} param0.options - Array of option objects with {value, label, icon}
 * @param {string} param0.defaultValue - The default selected value
 * @returns {Object} The dropdown component with HTMLElement and methods
 */
const dropdown = ({ label, name, options = [] } = {}) => {
  const forId = options.reduce(
    (acc, option) => `${acc}-${option.value}`,
    'dropdown',
  );

  const select = _(
    `select.none#${forId}[name="${name}"::aria-label="${label}"]`,
    options.map((option) => _(`option[value="${option.value}"]`, option.label)),
  );

  return _(`label.chip-dropdown[for="${forId}"::title="${label}"]`, [
    _('div.icon.ms'),
    select,
  ]);
};

export default dropdown;
