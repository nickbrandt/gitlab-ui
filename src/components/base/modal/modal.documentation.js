import examples from './examples';
import description from './modal.md';

export default {
  bootstrapComponent: 'b-modal',
  followsDesignSystem: true,
  description,
  examples,
  slots: [
    {
      name: 'modal-header',
      description:
        'Entire modal header container contents (including the close button on the top right corner)',
    },
    {
      name: 'modal-title',
      description: 'Modal title. If modal-header slot is used, this slot will not be shown.',
    },
    {
      name: 'modal-header-close',
      description:
        'Content of Modal header close button. If modal-header slot is used, this slot will not be shown.',
    },
    {
      name: 'modal-footer',
      description:
        'Populated via props: modal-action-primary, modal-action-cancel and modal-action-secondary.',
    },
  ],
  events: [
    {
      event: '@primary',
      description: 'Emitted when clicked on modal-action-primary',
    },
    {
      event: '@secondary',
      description: 'Emitted when clicked on modal-action-secondary',
    },
    {
      event: '@canceled',
      description: 'Emitted when clicked on modal-action-cancel',
    },
    {
      event: '@change',
      description: 'Emitted when the modal visibility changes',
    },
  ],
};
