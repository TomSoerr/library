import './nav-button.css';
import { _ } from '../../helper';

/**
 * @param {string} icon - Icon code
 * @param {string} aria - Lable the button
 * @param {boolean} background - If the button has a background
 * @returns {HTMLElement} - The created icon button
 */
export default ({ icon, aria, background }) =>
  _(
    `button.nav-button.none${background ? '.background' : ''}[title="${aria}",aria-label="${aria}"]`,
    [_(`div.ms[style="--icon: '${icon}';"]`)],
  );
