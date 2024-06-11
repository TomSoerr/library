import './nav-tab.css';
import { _ } from '../../helper';

/**
 * @param {string} icon - Icon code
 * @param {string} lable - Lable the button
 * @returns {HTMLElement} - The created icon button
 */
export default ({ icon, lable }) =>
  _('button', {
    attr: {
      class: 'nav-tab none',
    },
    children: [
      _('div', {
        attr: { style: `--icon: ${icon};` },
      }),
      _('span', {
        attr: { text: lable },
      }),
    ],
  });
