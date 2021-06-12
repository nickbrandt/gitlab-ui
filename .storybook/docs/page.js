import React from 'react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';
import { ImportInfo, LinkToSource } from './blocks';

export const page = () => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
      <Title />
      <LinkToSource />
    </div>
    <Subtitle />
    <ImportInfo />
    <Description />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </>
);
