import { GetServerSideProps } from 'next';
import router, { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface IProviders {
  id: string;
  name: string;
  email: string;
}

interface DashboardProps {
  providers: IProviders[];
}

export default function Dashboard({ providers }: DashboardProps) {
  return (
    <>
      <title>
        Dashboard | MarsJupyter
      </title>

      <div>
        <h1>Dashboard</h1>
      </div>
      <ul>
        {
          providers.map((provider) => (
            <li key={provider.id}>
              <strong>
                {' '}
                Name:
                {provider.name}
              </strong>
              <strong>
                {' '}
                E-mail:
                {provider.email}
              </strong>
            </li>
          ))
        }
      </ul>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (ctx) => {
  const { token, user } = ctx.req.cookies;
  console.log('user', user);
  console.log(token);

  if (!token) {
    console.log('You have not authorization');
    ctx.res.setHeader('location', '/');
    ctx.res.statusCode = 302;
    ctx.res.end();
  }

  const response = await fetch('http://localhost:3333/providers/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const providers = await response.json();
  console.log(providers);

  return {
    props: { providers },
  };
};
