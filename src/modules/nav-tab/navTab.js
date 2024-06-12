import './nav-tab.css';
import { _ } from '../../helper';

/**
 * @param {string} icon - Icon code
 * @param {string} lable - Lable the button
 * @param {string} title - Title the button
 * @returns {HTMLElement} - The created icon button
 */
export default ({ icon, lable, title }) =>
  _('button.nav-tab.none', [
    _(`div[style="--icon: '${icon}';",title="${title}"]`),
    _(`span{${lable}}`),
  ]);
