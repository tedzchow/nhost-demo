import { NhostClient } from "@nhost/nhost-js";

const nhost = new NhostClient({
  backendUrl: 'https://frbscsdwzrciofdbphwf.nhost.run',
});

const request = (async () => {
  // Sign in user
  const signInResponse = await nhost.auth.signIn({
    email: 'testuser@gmail.com',
    password: 'password',
  })

  // Handle sign-in error
  if (signInResponse.error) {
    throw signInResponse;
  }

  // nhost.graphql.request returns a promise, so we use await here
  const todos = await nhost.graphql.request(`
    query {
      todos {
        id
        created_at
        name
        is_completed
      }
    }
  `);

  // Print todos to console
  console.log(JSON.stringify(todos.data, null, 2));
});

request();
