export const onRequest: PagesFunction<Env> = async ({ env, params }) => {
  let path = params.path;
  if (Array.isArray(path)) {
    path = path.join("/");
  }
  const urlString = `${env.API_URL}${path}`;
  console.log("url:", urlString);

  let response = await fetch(urlString, {
    cf: {
      cacheTtl: 1 * 60 * 60, // 1 hour,
      cacheEverything: true,
    },
  });

  response = new Response(response.body, response);
  response.headers.set("Cache-Control", "max-age=1500");

  return response;
};
