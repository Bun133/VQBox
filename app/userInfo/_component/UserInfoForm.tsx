import { Button, Field, Input, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

type UserInfoFormProps = {
  savedUserInfo?: {
    displayName: string;
  };
  onSubmit: (value: { displayName: string }) => Promise<void>;
};

export const UserInfoForm = (props: UserInfoFormProps) => {
  const { onSubmit, savedUserInfo } = props;
  const [displayName, setDisplayName] = useState(
    savedUserInfo?.displayName ?? '',
  );

  const isDirty = useMemo(() => {
    return displayName !== savedUserInfo?.displayName;
  }, [displayName, savedUserInfo]);

  return (
    <VStack gap={4} w="full">
      <Field.Root>
        <Field.Label>表示名</Field.Label>
        <Input
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
        />
      </Field.Root>

      <Button
        onClick={() => onSubmit({ displayName })}
        disabled={!displayName || !isDirty}
      >
        更新
      </Button>
    </VStack>
  );
};
