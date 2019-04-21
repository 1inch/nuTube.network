import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RaidenService {

    nodeAddress = 'http://localhost:5001';
    nodeAddress2 = 'http://localhost:5002';

    const
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private http: HttpClient
    ) {
    }

    public async getChannels(token, partnerAddress) {

        return await this.http.get(
            this.nodeAddress2 + '/api/v1/channels/' + token + '/' + partnerAddress
        ).toPromise();
    }

    public async createChannel(token, partnerAddress, totalDeposit) {

        return await this.http.put(
            this.nodeAddress + '/api/v1/channels'
            , {
                'partner_address': partnerAddress,
                'token_address': token,
                'total_deposit': totalDeposit,
                'settle_timeout': 500
            },
            this.httpOptions
        )
            .toPromise();
    }
}
