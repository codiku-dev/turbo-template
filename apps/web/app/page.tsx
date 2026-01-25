'use client';
import { Button } from '@repo/ui/button/button';
import { trpc } from '@web/libs/trpc-client';
import { Suspense } from 'react';

export default function Home() {
  const { data: users } = trpc.users.getAllUsers.useQuery();
  return (
    <div>
      <main>
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button>UI shared package button</Button>
        <div className="">A fetch response from the API:</div>

        {users?.map((user: any) => (
          <div key={user.id}>
            {user.firstName} {user.lastName}
          </div>
        ))}
      </main>
      <footer></footer>
    </div>
  );
}
