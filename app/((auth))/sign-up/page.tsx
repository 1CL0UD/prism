'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SignUpValidation } from '@/lib/validation';
import Image from 'next/image';
import { useState } from 'react';
import { LoaderPinwheel } from 'lucide-react';
import Link from 'next/link';
import { createUserAccount } from '@/lib/actions/user.actions';

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      username: '',
    },
  });
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    setIsLoading(true);
    try {
      const newUser = await createUserAccount(values);
      console.log(newUser);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <Image
          src={'/assets/images/logo.svg'}
          width={171}
          height={36}
          alt={'Logo'}
        />
        <h2 className="h3-bold md:h2-bold pt-6 sm:scroll-pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular">
          Enter your account details to use Prism
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isLoading ? <LoaderPinwheel className="animate-spin" /> : 'Submit'}
          </Button>
        </form>
        <p className="text-sm font-normal text-light-2 text-center mt-4">
          Already have an account?{' '}
          <Link
            href={'/sign-in'}
            className="text-primary-500 text-sm font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </Form>
  );
}
