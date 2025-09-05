'use client';

import { toaster } from '@/components/ui/toaster';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Button, Field, Textarea, VStack } from '@chakra-ui/react';
import { useMutation } from 'convex/react';
import { useState } from 'react';

export const ResponseInput = ({
  questionId,
}: {
  questionId: Id<'question'>;
}) => {
  const [text, setText] = useState<string>('');
  const sendResponse = useMutation(api.response.addResponse);

  return (
    <VStack w="full" gap={4}>
      <Field.Root>
        <Field.Label>回答入力</Field.Label>
        <Textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </Field.Root>

      <Button
        disabled={!text}
        onClick={async () => {
          const result = await sendResponse({
            questionId,
            text: text!,
          });

          if (result.status === 'Ok') {
            toaster.success({
              title: '回答を送信しました',
            });
          } else if (result.status === 'Unauthenticated') {
            toaster.error({
              title: 'ログインしてください',
            });
          } else if (result.status === 'QuestionNotFound') {
            toaster.error({
              title: '質問が見つかりません',
            });
          } else if (result.status === 'AlreadyAnswered') {
            toaster.error({
              title: 'この質問には既に回答しています',
            });
          }

          setText('');
        }}
      >
        回答を送信
      </Button>
    </VStack>
  );
};
