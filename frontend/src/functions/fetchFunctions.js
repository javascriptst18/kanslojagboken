export const patchFetchData = async (url, post) => {
  try {
    const response = await fetch(url, {
      method: 'POST',

      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const getFetch = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    return e;
  }
};
