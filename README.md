Hi, I have a strong suspicion that something goes awry when using decryptAndCombine multiple times in succession. 

Note how the titles array differs between response and logs.
.. and how this happens ireegularly .. i.e. sometimes it can be correctly displayuing two items in both arrays, sometimes in succession. (i got fooled in some ocassions) 

result from lit action: {
  success: true,
  signedData: {},
  decryptedData: {},
  claimData: {},
  response: '{"titles":["Maecenas nec odio et ante"]}',
  logs: '[ "Maecenas nec odio et ante", "Home" ]\n'
}