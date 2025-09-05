'use client';

import { CloseIcon } from '@/app/_components/icons/CloseIcon';
import { QuestionCard } from '@/app/authed/question/_component/QuestionCard';
import { ResponseInput } from '@/app/authed/question/_component/ResponseInput';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Dialog, VStack } from '@chakra-ui/react';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';

export const QuestionDetailModalInterceptWrapper = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <Dialog.Root
      defaultOpen
      onOpenChange={({ open }) => {
        if (!open) {
          router.back();
        }
      }}
      size={{ lg: 'xl', base: 'full' }}
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
            <QuestionDetailModal id={id} />
          </Dialog.Body>
          <Dialog.Footer />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

const QuestionDetailModal = ({ id }: { id: string }) => {
  const question = useQuery(api.question.getQuestionById, {
    id: id as Id<'question'>,
  });

  if (question?.status === 'Ok') {
    return (
      <VStack>
        <QuestionCard
          text={question.question.text}
          _id={question.question._id}
          displayActions={false}
          wFill
        />

        <ResponseInput questionId={question.question._id} />
      </VStack>
    );
  } else {
    return <div>Question not found</div>;
  }
};
