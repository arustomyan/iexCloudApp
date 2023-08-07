const BASE_URL = "https://cloud.iexapis.com";

type getQuotes = { token: string };

const getQuotes = async ({ token }: getQuotes) => {
  return fetch(`${BASE_URL}/stable/tops?token=${token}`).then((response) =>
    response.json()
  );
};

export { getQuotes };
