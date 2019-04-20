# nuTube.network


# Let's start
First you need to install Etherlime:
```
    npm install -g etherlime
```

Now a tidy structured project must have been shaped. Next step is to build a local ganache.

```
    etherlime ganache
```

Deploy the smart contract. In a new console tab run:

```
    etherlime deploy
```

The contract has been compiled within the deployment. But if you need to do it separately just run `etherlime compile`.

When your deployment is finished successfully copy the address of the contract that is shown as a Result in the report table and assign its value to the `contractAddress` parameter in `config.json` file. Now we are ready to run the dApp.

```
    cd web
    ng serve --open
```

# Metamask connection
Get Metamask extension to your browser or if you already have just log in. To use local ganache's accounts you need to import them (or a few of them) by copying their private keys. Then connect Metamask to the private network - Localhost 8545. And go on.


# Run tests
dApp includes tests. To test the smart contract run `etherlime test`.

#### Used public resources
This project is based on etherlime angular boilerplate. 
