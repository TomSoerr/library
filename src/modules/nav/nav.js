import './nav.css';
import { _ } from '../../helper';
import navButton from '../nav-button/navButton';
import navTab from '../nav-tab/navTab';

const settings = navButton({
  icon: '\\e8b8',
  aria: 'Einstellungen',
  background: false,
});

const addBook = navButton({
  icon: '\\e145',
  aria: 'Buch hinzufügen',
  background: true,
});

const books = navTab({ icon: '\\f53e', lable: 'Bücher' });

const stats = navTab({ icon: '\\e4fc', lable: 'Stats' });

const search = navTab({ icon: '\\e8b6', lable: 'Suchen' });

const Nav = (() =>
  _('nav#nav', [
    _('div', [settings, addBook]),
    _('div', [books, stats, search]),
  ]))();

export { Nav as default, settings, addBook, books, stats, search };
