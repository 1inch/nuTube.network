import {Injectable} from '@angular/core';
import {ethers} from 'ethers';
import {verifyMessage} from 'ethers/utils/secp256k1';

declare let ethereum: any;
declare let window: any;
declare let web3: any;

@Injectable({
    providedIn: 'root'
})
export class Web3Service {

    public provider: ethers.providers.JsonRpcProvider;

    constructor() {
        this.bootstrapWeb3();
    }

    public async bootstrapWeb3() {

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (window.ethereum) {

            this.provider = new ethers.providers.Web3Provider(window.ethereum);

            try {
                // Request account access if needed
                await ethereum.enable();
            } catch (error) {
                // User denied account access...
                alert('Please connect Metamask to dApp!');
            }
        } else if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider
            this.provider = new ethers.providers.Web3Provider(web3.currentProvider);
        } else {

            console.log('No web3? You should consider trying MetaMask!');
            this.provider = new ethers.providers.InfuraProvider('homestead');
        }
    }

    public signMessage(message) {

        return this.provider
            .getSigner(0)
            .signMessage(message);
    }

    public messageRecover(digest, signature) {

        return verifyMessage(digest, signature);
    }
}
