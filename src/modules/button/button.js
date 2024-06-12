import './button.css';
import { _ } from '../../helper';

const button = ({ text, type, icon = null } = {}) =>
  _(
    `button.button.none${type ? `.${type}` : ''}${icon ? `.icon[style="--icon: '${icon}';"]` : ''}`,
    text,
  );

export default button;
