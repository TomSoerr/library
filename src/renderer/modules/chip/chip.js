import './chip.css';
import { _ } from '../../helper';

/**
 * Simple chip
 * @param {Object} param0
 * @param {string} param0.label - The label for the chip
 * @param {("radio"|"checkbox")} param0.type - The type of the chip
 * @param {string} param0.name - The name attribute of the chip
 * @param {boolean} param0.checked - If the chip is checked
 * @param {string} param0.icon - The icon code for the chip
 * @returns {HTMLElement} The chip element
 */
const chip = ({ label, type, name, checked, icon } = {}) => {
  // Replace special characters for html attributes
  let forId = label.toLowerCase().replace(' ', '-');
  forId = forId.replace('ä', 'ae');
  forId = forId.replace('ö', 'oe');
  forId = forId.replace('ü', 'ue');

  // Concat string for attributes
  const attributes = String.prototype.concat(
    `type="${type}"`,
    `::name="${name}"`,
    `${`::style="--icon: '${icon}';"`}`,
    type === 'radio' ? `::value="${forId}"` : '',
  );

  const input = _(`input.ms-within.none#${type}-${forId}[${attributes}]`);

  // If checked, set the checked attribute
  if (checked) {
    input.checked = true;
  }

  return _(`label.chip[for="${type}-${forId}"]`, [input, label]);
};

export default chip;
