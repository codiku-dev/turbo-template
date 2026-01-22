import { Button } from '@repo/ui/button/button';
import { Suspense } from 'react';

export default async function Home() {
  const response = await fetch('http://localhost:3090/users');
  const data = await response.json();
  return (
    <div>
      <main >
        <h1 className='text-2xl font-bold'>Hello World</h1>
        <Button>UI package button</Button>
       <div>A fetch response from the API:</div>
        
          {data.map((user: any) => (
            <div key={user.id}>{user.firstName} {user.lastName}</div>
          ))} 
      </main>
      <footer >
      </footer>
    </div>
  );
}
