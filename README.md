# totoro-face-full

## Additional Files - place in root directory

1. To get the backend to work you will need to create an .env file and input your own values for the following: 
```
- DATABASE=
- DATABASE_USER=
- DATABASE_PASSWORD=
- SECRET=
- SECRET_EMAIL=
- GMAIL_USER=
- GMAIL_PASS=
```
- For the SECRET, this can be any random string as it will be used by the JWT to encode and decode tokens. Same goes for the SECRET_EMAIL 
- For the Gmail user and pass, this can be generated by going into your google account and creating credentials for application uses. See https://support.google.com/mail/answer/185833?hl=en

2. To run the backend code properly, you will need to create a .babelrc file with the following:
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
```
