import './styles/index.css';
import Helper, { _ } from './helper';
import Nav from './modules/nav/nav';
import Modal from './modules/modal/modal';

// Import the different pages
import Books from './pages/books';
import Stats from './pages/stats';
import Search from './pages/search';
import ModalSettings from './pages/modalSettings';
import ModalAddBook from './pages/modalAddBook';

// Set the zoom factor
window.electron.setZoomFactor(1);
window.electron.setVisualZoomLevelLimits(1, 1);

// Create the main element
Helper.main = _('main');

// Set the default page
Helper.updateMain(Books);

document.body.append(
  Nav.HTMLElement,
  _('div.main-wrapper', Helper.main),
  Modal.HTMLElement,
);

Nav.addBook.click();
