import { Injectable } from '@angular/core';
import {ethers} from 'ethers';

declare let ethereum: any;
declare let window: any;
declare let web3: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  public provider: any;

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
        alert('Please connect Metamask to QRToken dApp!');
      }
    } else if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.provider = new ethers.providers.Web3Provider(web3.currentProvider);
    } else {

      console.log('No web3? You should consider trying MetaMask!');
      this.provider = new ethers.providers.InfuraProvider('homestead');
    }
  }
}
