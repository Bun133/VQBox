'use client';

import { toaster } from '@/components/ui/toaster';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Button, Field, Input, VStack } from '@chakra-ui/react';
import { useMutation } from 'convex/react';
import { useState } from 'react';

export const SendQuestionPageWrapper = ({ userId }: { userId: string }) => {
  const sendQuestion = useMutation(api.question.createQuestion);
  const [text, setText] = useState('');

  return (
    <VStack>
      <Field.Root>
        <Field.Label>質問内容</Field.Label>
        <Input value={text} onChange={(e) => setText(e.target.value)} />
      </Field.Root>

      <Button
        disabled={!text}
        onClick={async () => {
          const result = await sendQuestion({
            text,
            sendTo: userId as Id<'users'>,
          });

          if (result.status === 'Ok') {
            toaster.success({
              title: '質問を送信しました',
            });
          } else if (result.status === 'RecipientNotFound') {
            toaster.error({
              title: '質問の送信先が見つかりません',
            });
          }

          setText('');
        }}
      >
        送信
      </Button>
    </VStack>
  );
};
