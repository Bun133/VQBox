'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { VStack } from '@chakra-ui/react';
import { useQuery } from 'convex/react';
import { QuestionCard } from '../../_component/QuestionCard';

export const QuestionDetailPageWrapper = ({ id }: { id: string }) => {
  const question = useQuery(api.question.getQuestionById, {
    id: id as Id<'question'>,
  });

  return (
    <VStack>
      {question?.status === 'Ok' ? (
        <QuestionCard
          text={question.question.text}
          _id={question.question._id}
        />
      ) : (
        <div>Question not found</div>
      )}
      this is detail page
    </VStack>
  );
};
