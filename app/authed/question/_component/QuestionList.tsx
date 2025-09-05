import { VStack } from '@chakra-ui/react';
import { QuestionCard } from './QuestionCard';

export const QuestionList = ({
  questions,
}: {
  questions: { _id: string; text: string }[];
}) => {
  return (
    <VStack gap={4}>
      {questions.map((q) => (
        <QuestionCard key={q._id} _id={q._id} text={q.text} />
      ))}
    </VStack>
  );
};
