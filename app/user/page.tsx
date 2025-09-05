'use client';

import { api } from '@/convex/_generated/api';
import { Box } from '@chakra-ui/react';
import { useQuery } from 'convex/react';
import { UserList } from './_component/UserList';

export default function UserListPage() {
  const users = useQuery(api.user.listRandomUsers);

  if (users?.status === 'Ok') {
    return <UserList users={users.users} />;
  }

  return <Box>Loading...</Box>;
}
