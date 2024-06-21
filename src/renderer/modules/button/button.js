import './button.css';
import { _ } from '../../helper';

/**
 * Simple solid button
 * @param {Object} param0
 * @param {string} param0.text - The text for the button
 * @param {string} param0.type - The type of the button
 * @param {string} param0.icon - The icon for the button
 * @returns
 */
const button = ({ text, type, submit, icon = null } = {}) => {
  const classes = String.prototype.concat(
    '.button.none.ms-within',
    type ? `.${type}` : '',
    icon ? '.icon' : '',
  );

  const attributes = String.prototype.concat(
    submit ? 'type="submit"' : 'type="button"',
    icon ? `::style="--icon: '${icon}';` : '',
  );

  return _(`button${classes}[${attributes}]`, text);
};

export default button;
