import './icon-button.css';
import { _ } from '../../helper';

/**
 * @param {string} icon - Icon code
 * @param {string} aria - Lable the button
 * @returns {HTMLElement} - The created icon button
 */
export default ({ icon, aria }) =>
  _(`button.icon-button.none[title="${aria}"::aria-label="${aria}"]`, [
    _(`div.ms[style="--icon: '${icon}';"]`),
  ]);
