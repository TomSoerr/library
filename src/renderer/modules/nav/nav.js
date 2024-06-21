import './nav.css';
import { _ } from '../../helper';
import navButton from '../nav-button/navButton';
import navTab from '../nav-tab/navTab';

const Nav = (() => {
  // Buttons that show a modal
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

  // Tabs that display different pages inside the main element
  const books = navTab({
    icon: '\\f53e',
    lable: 'Bücher',
    title: 'Alle Bücher',
  });

  const stats = navTab({
    icon: '\\e4fc',
    lable: 'Stats',
    title: 'Statistiken',
  });

  // Remove active class from all tabs
  const removeActive = () => {
    [books, stats].forEach((tab) => tab.classList.remove('active'));
  };

  // HTML Element of the navigation
  const HTMLElement = (() =>
    _('nav#nav', [_('div', [settings, addBook]), _('div', [books, stats])]))();

  return { HTMLElement, removeActive, settings, addBook, books, stats };
})();

export default Nav;
