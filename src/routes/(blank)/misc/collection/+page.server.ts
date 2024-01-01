import { env } from '$env/dynamic/private';

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