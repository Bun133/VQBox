'use client';

import { CloseIcon } from '@/app/_components/icons/CloseIcon';
import { Dialog, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function QuestionDetailModalIntercept({}) {
  const router = useRouter();

  return (
    <Dialog.Root
      defaultOpen
      onOpenChange={({ open }) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <CloseIcon size="lg" />
          </Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title />
          </Dialog.Header>
          <Dialog.Body>
            <VStack>You are seeing @modal</VStack>
          </Dialog.Body>
          <Dialog.Footer />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
