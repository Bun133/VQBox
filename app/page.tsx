'use client';

import { Box, HStack } from '@chakra-ui/react';

export default function Page({}) {
  return (
    <HStack>
      <Box bg="bg.emphasized">テストでございますよ</Box>
      <Box bg="red.100">テストでございますよ</Box>
      <Box bg="red.100">テストでございますよ</Box>
    </HStack>
  );
}