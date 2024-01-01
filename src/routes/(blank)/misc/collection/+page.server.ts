import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// export function load({}) {
//   console.log(env.SECRET_DISCOGS_TOKEN);
// }


// /** @type {import('./$types').PageLoad} */
// export const load = async ({ fetch }) => {
//   const res = await fetch('https://api.coinlore.com/api/tickers/')
//   const { data } = await res.json()
//   return {
//     currencies: data,
//   }
// }


/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
  const res = await fetch(`https://api.discogs.com/users/seanehalpin123/collection/folders/0/releases`, {
    headers: {
      'Authorization': `Discogs token=${env.SECRET_DISCOGS_TOKEN}`
    }
  });
  // const userDetails = await res.json()
  // const data = {
  //   username: userDetails.username
  // };
  const data = await res.json()
  // return {
  //   user: data,
  // }
  return data
}


// export async function load() {
//   try {
//     const response = await fetch(`https://api.discogs.com/users/seanehalpin123`, {
//       headers: {
//         'Authorization': `Discogs token=${env.SECRET_DISCOGS_TOKEN}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch collection');
//     }

//     const userDetails = await response.json();

//     // Ensure the data is a plain object
//     const user = {
//       username: userDetails.username
//     };

//     console.log(user);

//     return {
//       props: {
//         user
//       }
//     };
//   } catch (e) {
//     return error(500, e.message);
//   }
// }