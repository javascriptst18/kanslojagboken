export const patchFetchData = async (url, post) => {
  try {
    return fetch(url, {
      method: 'POST',

      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return error;
  }
};

export const getFetch = async (url) => {
  try {
    const response = fetch(url);
    return await response.json();
  } catch (e) {
    return e;
  }
};
