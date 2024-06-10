import './nav-button.css';
import { _ } from '../../helper';

/**
 * @param {string} icon - Icon code
 * @param {string} aria - Lable the button
 * @param {boolean} background - If the button has a background
 * @returns {HTMLElement} - The created icon button
 */
export default ({ icon, aria, background }) =>
  _('button', {
    attr: {
      'class': `nav-button none${background ? ' background' : ''}`,
      'aria-label': aria,
      'title': aria,
    },
    children: [
      _('div', {
        attr: { style: `--icon: ${icon};` },
      }),
    ],
  });
