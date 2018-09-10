patchFetchData = async (url, post) => {
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
