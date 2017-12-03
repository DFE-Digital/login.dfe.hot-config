[![Build Status](https://travis-ci.org/DFE-Digital/login.dfe.hot-config.svg?branch=master)](https://travis-ci.org/DFE-Digital/login.dfe.hot-config)

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

[![VSTS Build Status](https://sfa-gov-uk.visualstudio.com/_apis/public/build/definitions/aa44e142-c0ac-4ace-a6b2-0d9a3f35d516/706/badge)](https://sfa-gov-uk.visualstudio.com/DfE%20New%20Secure%20Access/_build/index?definitionId=706&_a=completed)

# login.dfe.hot-config


## Setup

If you plan to run a local version of redis the following is required:


1) You will need [brew](https://brew.sh/)
1) Once installed from terminal run ``` brew install redis ```
1) Then ```brew services start redis``` to start a local instance of redis
1) A collection called 'Clients' should also be created, this is a string collection

To run the hot config project the following environment variables need to be set

**REDIS_CONNECTION** - This can be left blank for local development

**PORT** - This is the port that you want the application to run on

## Auth Options

## Active Directory

**AUTH_TYPE**='aad' 

**IDENTITY_METADATA=** - AAD Meta data URL
 
**CLIENT_ID** - AAD Application ID 


## JWT

**AUTH_TYPE**='secret'
 
**JWT_SECRET** - This is the secret which has been used to create the JWT token and used to verify  



## OIDC Clients schema

`GET /oidcclients`

The OIDC clients match the schema defined in [OIDC](https://github.com/panva/node-oidc-provider) The following is required as a minimum for the client definition

```
{
    "client_id": "foo4",
    "client_secret": "bamr",
    "redirect_uris": [
        "https://localhost:1234/asdasd"
    ]
}
```
This should be added to the OIDCClients collection in redis.


## SAML Clients schema

`GET /samlclients`

The following is the schema for SAML clients

```
[
	{
		"id": "470d8218-a230-11e7-abc4-cec278b6b50a",
		"identifierUri": "https://localhost:4432/470d8218-a230-11e7-abc4-cec278b6b50a",
		"returnUrls": [
			"https://localhost:4432/"
		],
		"publicKeyId": "470d8218-a230-11e7-abc4-cec278b6b50a"
	}
]
```
This should be added to the SAMLClients collection in redis.
