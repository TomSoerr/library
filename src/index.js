import './index.css';
import Helper from './helper';
import Nav from './modules/nav/nav';

Helper.main = Helper.createElement('main');

document.body.append(Nav, Helper.main);
