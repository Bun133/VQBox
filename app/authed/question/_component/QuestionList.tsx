import { Button, Card, VStack } from '@chakra-ui/react';

export const QuestionList = ({
  questions,
}: {
  questions: { _id: string; text: string }[];
}) => {
  return (
    <VStack gap={4} w="full">
      {questions.map((q) => (
        <Question key={q._id} _id={q._id} text={q.text} />
      ))}
    </VStack>
  );
};

const Question = ({ text, _id }: { text: string; _id: string }) => {
  return (
    <Card.Root key={_id} w="full">
      <QuestionText text={text} />
      <Card.Footer>
        <Button>返信</Button>
      </Card.Footer>
    </Card.Root>
  );
};

const QuestionText = ({ text }: { text: string }) => {
  return (
    <VStack bg="purple.400" w="full" h="10rem" justify="center" align="center">
      <VStack bg="bg" w="80%" h="80%" borderRadius={4}>
        {text}
      </VStack>
    </VStack>
  );
};
