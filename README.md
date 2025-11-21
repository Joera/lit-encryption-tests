Hi, I have a strong suspicion that something goes awry when using decryptAndCombine multiple times in succession. 

Note how the titles array differs between response and logs.
.. and how this happens irregularly .. i.e. sometimes it can be correctly displaying both items twice, sometimes in succession. (i got fooled on some ocassions) 

example result from lit action: 

```
{
  success: true,
  signedData: {},
  decryptedData: {},
  claimData: {},
  response: '{"titles":["Maecenas nec odio et ante"]}',
  logs: '[ "Maecenas nec odio et ante", "Home" ]\n'
}
```

occassionaly: 

```
{
  success: true,
  signedData: {},
  decryptedData: {},
  claimData: {},
  response: '{"titles":["Maecenas nec odio et ante", "Home" ]}',
  logs: '[ "Maecenas nec odio et ante", "Home" ]\n'
}
```