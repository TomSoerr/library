import './index.css';
import Helper, { _ } from './helper';
import Nav from './modules/nav/nav';
import Books from './pages/books';

Helper.main = Helper.createElement('main');

document.body.append(Nav, Helper.main);

Helper.updateMain(Books);
