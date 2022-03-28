import Checklist, { Props } from './Checklist';

export default { title: 'components/Checklist' };

export const Default = (args: Props) => <Checklist {...args} />;

Default.args = {
  // add control data
};
