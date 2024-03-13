let getBasicServiceURL = function() {
  //! Actual URL: http://concordiatest.banyodev.dk
  return "http://localhost:8080/get-data_sven.php"; // TODO Need to change back to the actual and original URL 
};

export async function getData() {
  const response = await fetch(getBasicServiceURL(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}