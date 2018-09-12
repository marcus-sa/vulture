# Vulture

## Description

Headless Habbo CMS supporting all major emulators

## Installation

Ensure you have `yarn` installed, otherwise install it `npm install -g yarn`
<br />
This API uses `docker`, so you must have [`docker-compose`](https://docs.docker.com/compose/install/) installed

Next step is to install all the required dependencies so that you can setup the API

```bash
$ yarn
```

## Setup

Simply run the following command and answer the prompts to setup everything needed

```bash
$ yarn setup
```

## Running the app

```bash
# docker development
$ yarn dc:dev

# will output docker-machine ip
$ yarn host
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
