# Notes for reviewers

1.. 2.. 3.. GO!

## Getting started

⚠️ The code is driven by tests in `./test/unit/use-cases.spec.ts`

1. Install dependencies

```
yarn install
```

2. Run unit tests

```
yarn test:unit
```

3. Run the server in local

```
yarn start:dev
```

## Decisions

### Global Structure

#### Key notes

- separation of concerns (controllers (http routes), application services, storage)
- use of repository pattern between application services and storage so to have flexibility to swap implementations of data access
- tests is setup to use sqlite in (test/local) env and postgres in other envs
