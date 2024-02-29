# Foundry Template [![Open in Gitpod][gitpod-badge]][gitpod] [![Github Actions][gha-badge]][gha] [![Foundry][foundry-badge]][foundry] [![License: MIT][license-badge]][license]

[gitpod]: https://gitpod.io/#https://github.com/OnchainGame/demo-non-field-rpg
[gitpod-badge]: https://img.shields.io/badge/Gitpod-Open%20in%20Gitpod-FFB45B?logo=gitpod
[gha]: https://github.com/OnchainGame/demo-non-field-rpg/actions
[gha-badge]: https://github.com/OnchainGame/demo-non-field-rpg/actions/workflows/ci.yml/badge.svg
[foundry]: https://getfoundry.sh/
[foundry-badge]: https://img.shields.io/badge/Built%20with-Foundry-FFDB1C.svg
[license]: https://opensource.org/licenses/MIT
[license-badge]: https://img.shields.io/badge/License-MIT-blue.svg

## Getting Started

```sh
$ bun install # install Solhint, Prettier, and other Node.js deps
```

## Features

## Installing Dependencies

Foundry typically uses git submodules to manage dependencies, but this template uses Node.js packages because
[submodules don't scale](https://twitter.com/PaulRBerg/status/1736695487057531328).

This is how to install dependencies:

1. Install the dependency using your preferred package manager, e.g. `bun install dependency-name`
    - Use this syntax to install from GitHub: `bun install github:username/repo-name`
2. Add a remapping for the dependency in [remappings.txt](./remappings.txt), e.g.
   `dependency-name=node_modules/dependency-name`

Note that OpenZeppelin Contracts is pre-installed, so you can follow that as an example.

## Usage

This is a list of the most frequently needed commands.

### Build

Build the contracts:

```sh
$ forge build
```

### Clean

Delete the build artifacts and cache directories:

```sh
$ forge clean
```

### Test

```sh
$ forge test -vv --fork-url https://sepolia.blast.io --fork-block-number 2203024
```

### Deploy

Deploy to Anvil:

```sh
$ forge script script/MugenToken.s.sol --broadcast --fork-url https://sepolia.blast.io --etherscan-api-key verifyContract  --verify --verifier-url 'https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan'
```

### Insert data

```sh
$ forge script script/InsertToken.s.sol --broadcast --fork-url https://sepolia.blast.io
```

### Lint

Lint the contracts:

```sh
$ bun run lint
```

## forge

-   forge install OpenZeppelin/openzeppelin-contracts
-   forge install vectorized/solady
-   forge install OpenZeppelin/openzeppelin-foundry-upgrades
-   forge install OpenZeppelin/openzeppelin-contracts-upgradeable

## License

This project is licensed under MIT.
