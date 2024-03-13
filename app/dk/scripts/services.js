let getBasicServiceURL = function() {
  //! Actual URL: http://concordiatest.banyodev.dk
  return "http://localhost:8080/"; // TODO Need to change back to the actual and original URL 
};

export async function getData() {
  const response = await fetch(getBasicServiceURL() + "get-data_sven.php", {
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