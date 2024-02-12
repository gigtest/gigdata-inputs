/**
 *
 * @param props
 * @returns {Promise<*>}
 * @param props.query {string} - The query to search for
 * @param props.apiURL {string} - The URL of the API
 * @param props.token {string} - The token to authenticate with
 * @param props.type {string} - The type of data to search for
 * @param props.count {string} - The number of results to return
 */
export const getGigdataHints = async (props) => {
  const data = {
    query: props.query,
    count: props.count,
  };
  const response = await fetch(props.apiURL + "/suggest/" + props.type, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + props.token,
    },
    body: JSON.stringify(data),
  });
  return (await response.json()).suggestions;
}