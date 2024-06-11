import './nav-tab.css';
import { _ } from '../../helper';

/**
 * @param {string} icon - Icon code
 * @param {string} lable - Lable the button
 * @returns {HTMLElement} - The created icon button
 */
export default ({ icon, lable }) =>
  _('button.nav-tab.none', [
    _(`div[style="--icon: '${icon}';"]`),
    _(`span{${lable}}`),
  ]);
