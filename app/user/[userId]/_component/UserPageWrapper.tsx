import { api } from '@/convex/_generated/api';
import { Box, Button, VStack } from '@chakra-ui/react';
import { useQuery } from 'convex-helpers/react/cache/hooks';
import Link from 'next/link';

export const UserPageWrapper = ({ userId }: { userId: string }) => {
  const userData = useQuery(api.user.getMyUserInfo);

  if (userData?.status === 'Ok') {
    return (
      <VStack gap={4}>
        <Box>表示名: {userData.displayName}</Box>
        <Link href={`/question/send/${userId}`}>
          <Button>質問する</Button>
        </Link>
      </VStack>
    );
  }
};
