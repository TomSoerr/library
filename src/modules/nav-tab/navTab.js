import './nav-tab.css';
import { _ } from '../../helper';

/**
 * @param {string} icon - Icon code
 * @param {string} lable - Lable the button
 * @param {boolean} background - If the button has a background
 * @returns {HTMLElement} - The created icon button
 */
export default ({ icon, lable, background }) =>
  _('button', {
    attr: {
      class: `nav-tab none${background ? ' background' : ''}`,
    },
    children: [
      _('div', {
        attr: { style: `--icon: ${icon};` },
      }),
      _('div', {
        attr: { text: lable },
      }),
    ],
  });
