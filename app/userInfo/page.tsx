'use client';

import { toaster } from '@/components/ui/toaster';
import { api } from '@/convex/_generated/api';
import { Box, Button, VStack } from '@chakra-ui/react';
import { useMutation, useQuery } from 'convex/react';
import Link from 'next/link';
import { UserInfoForm } from './_component/UserInfoForm';

export default function UserInfoPage() {
  const myInfo = useQuery(api.user.getMyUserInfo);
  const saveUserInfo = useMutation(api.user.saveUserInfo);

  const onSave = async (value: { displayName: string }) => {
    const result = await saveUserInfo(value);

    if (result.status === 'Ok') {
      toaster.success({
        title: 'ユーザー情報を保存しました',
      });
    } else if (result.status === 'Unauthenticated') {
      toaster.error({
        title: 'ログインしてください',
      });
    }
  };

  if (myInfo?.status === 'Ok') {
    return <UserInfoForm savedUserInfo={myInfo} onSubmit={onSave} />;
  } else if (myInfo?.status === 'InfoNotFound') {
    return <UserInfoForm onSubmit={onSave} />;
  } else if (myInfo?.status === 'Unauthenticated') {
    return (
      <VStack>
        <Box>ログインしてください</Box>
        <Link href="/signin">
          <Button>ログイン</Button>
        </Link>
      </VStack>
    );
  }

  return <Box>Loading...</Box>;
}
