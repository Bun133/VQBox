'use client';

import { toaster } from '@/components/ui/toaster';
import { Button, Card, Field, Input, VStack } from '@chakra-ui/react';
import { useAuthActions } from '@convex-dev/auth/react';
import { useState } from 'react';

export default function SigninPage() {
  const [step, setStep] = useState<'inputEmail' | 'inputOTP'>('inputEmail');
  const [email, setEmail] = useState<string>();
  const [code, setCode] = useState<string>();

  const { signIn } = useAuthActions();

  return step === 'inputEmail' ? (
    <InputEmail
      nextStep={() => setStep('inputOTP')}
      email={email}
      setEmail={setEmail}
      onSignIn={() => {
        if (email) {
          signIn('resend-otp', { email });
        }
      }}
    />
  ) : (
    <InputOTP
      onVerify={async () => {
        if (code) {
          const { signingIn } = await signIn('resend-otp', {
            email: email!,
            code: code,
          });
          toaster.create({
            title: signingIn ? 'ログインしました' : 'コードが違います',
            type: signingIn ? 'success' : 'error',
          });
        }
      }}
      code={code}
      setCode={setCode}
    />
  );
}

const InputEmail = ({
  nextStep,
  email,
  setEmail,
  onSignIn,
}: {
  nextStep: () => void;
  email: string | undefined;
  setEmail: (email: string) => void;
  onSignIn: () => void;
}) => {
  return (
    <VStack w="full" alignItems="center">
      <Card.Root>
        <Card.Body gap={4}>
          <Card.Title>ログイン</Card.Title>

          <VStack lg={{ w: '50rem' }} w="70dvw" gap={4}>
            <Field.Root>
              <Field.Label>メールアドレス</Field.Label>
              <Input
                placeholder="example@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field.Root>

            <Button
              disabled={!email}
              onClick={() => {
                onSignIn();
                nextStep();
              }}
            >
              ログイン
            </Button>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};

const InputOTP = ({
  onVerify,
  code,
  setCode,
}: {
  onVerify: () => void;
  code: string | undefined;
  setCode: (code: string) => void;
}) => {
  return (
    <VStack w="full" alignItems="center">
      <Card.Root>
        <Card.Body gap={4}>
          <Card.Title>ログイン</Card.Title>

          <VStack lg={{ w: '50rem' }} w="70dvw" gap={4}>
            <Field.Root>
              <Field.Label>コード入力</Field.Label>
              <Input
                placeholder="1234"
                onChange={(e) => setCode(e.target.value)}
              />
            </Field.Root>

            <Button
              disabled={!code}
              onClick={() => {
                onVerify();
              }}
            >
              ログイン
            </Button>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};
