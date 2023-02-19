# Maestro-ts (WIP)

An executable compiler for creating yaml-flows from typescript files.

## What it is

Maestro is a new e2e testing tool for mobile apps. Usually you would write testing flows in yaml, which however, can be a hassle to write, since there is no easy way to set up autocomplete and the syntax can be fairly verbose at times. Additionally there are currently still some instabilities with maestro, such as with the inputText-directive, which can be fixed using hacky workarounds. Maestro-ts introduces an intelligent parsing-layer which takes in a simplistic typescript script and generates the yaml for you.

## Recommended Usage

> 💡 **_NOTE:_** First off, make sure you've set up [maestro](https://maestro.mobile.dev/) correctly.

In your react native app, create a folder where your tests will live.
We recommend `my-app/test/e2e`.

#### Setting up types

To set up types, run

```sh
yarn add maestro-ts --dev
```

#### Creating your first flow

Create a file called `my-first-flow.maestro.ts` and add the following content:

```ts
import * as Maestro from "maestro-ts"

Maestro.initApp("com.myTeam.myApp")
Maestro.tapOn("someTestId")
```

#### Compiling and running your flows

Now, from your e2e test folder, you can generate the yaml flows and run them.

```sh
npx maestro-ts
maestro test test/e2e/build/my-first-flow.yaml
```
