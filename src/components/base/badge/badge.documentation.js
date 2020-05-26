import examples from './examples';

export default {
  examples,
  bootstrapComponent: 'b-badge',
  bootstrapPropsInfo: {
    href: {
      additionalInfo:
        'Denotes the target URL of the link for standard a links. Providing this makes the badge actionable (clickable).',
    },
  },
  propsInfo: {
    variant: {
      additionalInfo: 'The variant of the badge.',
      enum: 'badgeVariantOptions',
    },
    size: {
      additionalInfo: 'The size of the badge.',
      enum: 'badgeSizeOptions',
    },
  },
};
