import { Id } from '@/convex/_generated/dataModel';
import { Button, Card, HStack, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export const UserList = ({
  users,
}: {
  users: { userId: Id<'users'>; displayName: string }[];
}) => {
  return (
    <VStack>
      {users.map((user) => (
        <UserListEntry
          key={user.userId}
          userId={user.userId}
          displayName={user.displayName}
        />
      ))}
    </VStack>
  );
};

const UserListEntry = ({
  userId,
  displayName,
}: {
  userId: string;
  displayName: string;
}) => {
  return (
    <Card.Root>
      <Card.Header>{displayName}</Card.Header>
      <Card.Body>userId: {userId}</Card.Body>
      <Card.Footer>
        <HStack w="full" justify={'flex-end'} gap={4}>
          <Link href={`/question/send/${userId}`}>
            <Button>質問を送る</Button>
          </Link>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
};
