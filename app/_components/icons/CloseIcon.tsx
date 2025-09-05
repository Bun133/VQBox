'use client';

import { Icon, IconProps } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

export const CloseIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <MdClose />
    </Icon>
  );
};
