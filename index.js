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

  // Insert todo
  // const { data: todo } = await nhost.graphql.request(`
  //   mutation insert_single_todo {
  //     insert_todos_one(
  //       object: {
  //         name: "Todo - 10"
  //       }
  //     ){
  //       id
  //       name
  //     }
  //   }
  // `);
  
  // console.log("Todo created with the data", todo);

  // Get todos
  const { data: todos } = await nhost.graphql.request(`
    query {
      todos {
        id
        created_at
        name
        is_completed
        user_id
      }
    }
  `);

  // Print todos to console
  console.log(JSON.stringify(todos, null, 2));
});

request();
