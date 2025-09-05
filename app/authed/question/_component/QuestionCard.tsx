import { Box, Button, Card, HStack, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export const QuestionCard = ({ text, _id }: { text: string; _id: string }) => {
  return (
    <Card.Root key={_id} xl={{ w: '50rem' }} w="min(90vw, 40rem)">
      <Card.Body>
        <QuestionText text={text} />
      </Card.Body>
      <Card.Footer>
        <HStack w="full" justify="flex-end">
          <Link href={`/authed/question/${_id}`}>
            <Button>返信</Button>
          </Link>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
};

const QuestionText = ({ text }: { text: string }) => {
  return (
    <VStack bg="purple.400" w="full" py="3rem" justify="center" align="center">
      <VStack
        bg="bg"
        w="80%"
        minH="10rem"
        p={4}
        borderRadius={4}
        justify={'center'}
        align="center"
      >
        <Box whiteSpace={'pre-wrap'}>{text}</Box>
      </VStack>
    </VStack>
  );
};
