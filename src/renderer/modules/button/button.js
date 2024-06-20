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
const button = ({ text, type, icon = null } = {}) =>
  _(
    `button.button.none.ms-within${type ? `.${type}` : ''}${icon ? `.icon[style="--icon: '${icon}';"]` : ''}`,
    text,
  );

export default button;
