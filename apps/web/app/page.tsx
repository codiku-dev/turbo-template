'use client';
import { Button } from '@repo/ui/button/button';
// import { trpc as backend } from '@web/libs/trpc-client';

export default function Home() {
  // const { data: users, isPending } = backend.users.getAllUsers.useQuery();
  return (
    <div>
      <main>
        <h1 className="text-2xl font-bold">Hello World</h1>
        <div className="">A fetch response from the API:</div>
        <Button>Coucou</Button>
        {/* {users?.map((user: any) => (
          <div key={user.id}>
            {user.firstName} {user.lastName}
          </div>
        ))} */}
      </main>
      <footer></footer>
    </div>
  );
}
