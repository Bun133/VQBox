'use node';

import { Email } from '@convex-dev/auth/providers/Email';
import { RandomReader, generateRandomString } from '@oslojs/crypto/random';
import { Resend as ResendAPI } from 'resend';

export const ResendOTP = Email({
  id: 'resend-otp',
  apiKey: process.env.AUTH_RESEND_KEY,
  maxAge: 60 * 15, // 15 minutes
  async generateVerificationToken() {
    const random: RandomReader = {
      read(bytes) {
        crypto.getRandomValues(bytes);
      },
    };

    const alphabet = '0123456789';
    const length = 4;
    return generateRandomString(random, alphabet, length);
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: 'VQBox <onboarding@vqbox.bun133.com>',
      to: [email],
      subject: `Sign in to VQBox`,
      text: 'Your code is ' + token,
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }
  },
});
