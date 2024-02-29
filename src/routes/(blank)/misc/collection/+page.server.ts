import { env } from '$env/dynamic/private';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  // URLs for the two API endpoints
  const releasesUrl = `https://api.discogs.com/users/seanehalpin123/collection/folders/0/releases`;
  const wantsUrl = `https://api.discogs.com/users/seanehalpin123/wants`;

  // Headers to be used for both requests
  const headers = {
    'Authorization': `Discogs token=${env.SECRET_DISCOGS_TOKEN}`,
  };

  // Create both fetch requests concurrently
  const [releasesResponse, wantsResponse] = await Promise.all([
    fetch(releasesUrl, { headers }),
    fetch(wantsUrl, { headers }),
  ]);

  // Parse JSON responses concurrently
  const [releasesData, wantsData] = await Promise.all([
    releasesResponse.json(),
    wantsResponse.json(),
  ]);

  // Optionally, log the data to the console
  // console.log(releasesData, wantsData);

  // Combine the data into a single object to return
  return {
    releases: releasesData,
    wants: wantsData,
  };
};
