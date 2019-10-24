# totoro-face-full

## Additional Files

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
