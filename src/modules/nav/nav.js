import './nav.css';
import { _ } from '../../helper';
import navButton from '../nav-button/navButton';

export default (() =>
  _('nav', {
    attr: { id: 'nav' },
    children: [
      _('div', {
        children: [
          navButton({
            icon: '"\\e8b8"',
            aria: 'Einstellungen',
            background: false,
          }),
          navButton({
            icon: '"\\e145"',
            aria: 'Buch hinzufügen',
            background: true,
          }),
        ],
      }),
    ],
  }))();
