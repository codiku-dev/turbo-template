import { Button } from '@repo/ui/button/button';
import { Suspense } from 'react';

export default async function Home() {
  const data: any[] = [];
  return (
    <div>
      <main>
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button>UI package button</Button>
        <div className="bg-red-400">A fetch response from the API:</div>

        {data.map((user: any) => (
          <div key={user.id}>
            {user.firstName} {user.lastName}
          </div>
        ))}
      </main>
      <footer></footer>
    </div>
  );
}
