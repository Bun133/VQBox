'use client';

import { api } from '@/convex/_generated/api';
import { Box, VStack } from '@chakra-ui/react';
import { useQuery } from 'convex/react';
import { QuestionList } from './_component/QuestionList';

export default function QuestionListPage() {
  const questions = useQuery(api.question.listMyQuestion);

  return (
    <VStack>
      {questions?.status === 'Ok' ? (
        <QuestionList questions={questions.questions} />
      ) : (
        <Box>Loading</Box>
      )}
    </VStack>
  );
}
