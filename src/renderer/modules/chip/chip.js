import './chip.css';
import { _ } from '../../helper';

const chip = ({ label, type, name, checked, icon } = {}) => {
  const attributes = String.prototype.concat(
    `type="${type}"`,
    `::name="${name}"`,
    `${`::style="--icon: '${icon}';"`}`,
  );

  let forId = label.toLowerCase().replace(' ', '-');

  forId = forId.replace('ä', 'ae');
  forId = forId.replace('ö', 'oe');
  forId = forId.replace('ü', 'ue');

  const input = _(`input.ms-within.none#${type}-${forId}[${attributes}]`);

  if (checked) {
    input.checked = true;
  }

  return _(`label.chip[for="${type}-${forId}"]`, [input, label]);
};

export default chip;
