import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from '../base/navigation.service';
import {ActivatedRoute} from '@angular/router';
import Peer from 'peerjs';
import {Web3Service} from '../utils/web3.service';
import {RaidenService} from '../utils/raiden.service';

declare const window: any;
declare const require: any;

const getStats = require('getstats');

export const createEmptyAudioTrack = () => {

    const AudioContext = window.AudioContext // Default
        || window.webkitAudioContext // Safari and old versions of Chrome
        || false;

    const ctx = new AudioContext;
    const oscillator = ctx.createOscillator();
    const dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();

    // @ts-ignore
    const track = dst.stream.getAudioTracks()[0];
    return Object.assign(track, {enabled: false});
};

export const createEmptyVideoTrack = ({width, height}) => {
    const canvas = Object.assign(document.createElement('canvas'), {width, height});
    canvas.getContext('2d').fillRect(0, 0, width, height);

    // @ts-ignore
    const stream = canvas.captureStream();
    const track = stream.getVideoTracks()[0];

    return Object.assign(track, {enabled: false});
};

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

    title = '';
    loading = false;
    receiving = false;
    videoPlayer: HTMLVideoElement;
    id;
    peer;
    remoteStream;
    bytesReceived = 0;

    tokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
    paymentBuffer = 0;
    username;

    price = 0.1; // 1 $

    constructor(
        public navigationService: NavigationService,
        private route: ActivatedRoute,
        private web3Service: Web3Service,
        private raidenService: RaidenService,
        private zone: NgZone
    ) {
    }

    @ViewChild('videoPlayer')
    set mainVideoEl(el: ElementRef) {
        this.videoPlayer = el.nativeElement;
    }

    async ngOnInit() {

        this.navigationService.showBackButton = true;
        this.id = this.route.snapshot.paramMap.get('id');

        if (this.id === 'cryptomaniacs') {
            this.title = 'Crypto Maniacs @ ETHCapeTown <span class="badge badge-success">FREE</span>';
        } else {
            this.title = 'Stream';

            try {
                this.username = await this.web3Service.provider.lookupAddress(this.id);
            } catch (e) {
                console.log(e);
            }

            if (!this.username) {
                this.username = this.id + ' (ENS not set)';
            }
        }

        this.connect();
    }

    async connect() {

        this.loading = true;

        let signedMessage;

        try {
            signedMessage = await this.web3Service.signMessage(this.id);
        } catch (e) {
            console.log(e);

            signedMessage = this.id;
        }

        try {

            const createResult = await this.raidenService.createChannel(
                this.tokenAddress,
                this.id,
                3973001667504607
            );

            console.log('createResult', createResult);
        } catch (e) {

            console.log(e);

            if (e.status !== 409 && this.id !== 'cryptomaniacs') {
                return;
            } else if (e.status === 409) {

                // try {
                //     const updateResult = await this.raidenService.updateChannel(
                //         this.tokenAddress,
                //         this.id,
                //         3973001667504607
                //     );
                // } catch (e) {
                //
                //     console.log(e);
                // }
            }
        }

        try {

            const createResult = await this.raidenService.pay(
                this.tokenAddress,
                this.id,
                1
            );

            console.log('createResult', createResult);
        } catch (e) {

            console.log(e);
        }

        this.peer = new Peer();

        this.peer.on('open', () => {
            console.log('PeerID:', this.peer.id);
        });

        this.peer.on('error', (err) => {

            this.loading = true;
            alert(err);
            console.error(err);

            window.location.reload();
        });

        const audioTrack = createEmptyAudioTrack();
        const videoTrack = createEmptyVideoTrack({width: 1280, height: 720});
        const mediaStream = new MediaStream([audioTrack, videoTrack]);

        const call = this.peer.call('NUTUBE_NETWORK_' + this.id, mediaStream, {
            metadata: signedMessage
        });

        console.log('call', call);

        this.initStatus(call.peer, call.peerConnection);

        call.on('stream', (remoteStream) => {

            console.log('remoteStream', remoteStream);

            this.receiving = true;
            this.videoPlayer.srcObject = remoteStream;
            this.videoPlayer.play();
            this.remoteStream = remoteStream;

            this.loading = false;
        });

        call.on('error', (err) => {

            this.loading = true;
            alert(err);
            console.log('Error', err);

            window.location.reload();
        });
    }

    async initStatus(user, peerConnection) {

        const repeatInterval = 2000; // 2000 ms == 2 seconds

        // console.log('Peer', peerConnection);

        getStats(peerConnection, async (result) => {

            // console.log('remote.ipAddress', result.connectionType.remote.ipAddress);
            // console.log('remote.candidateType', result.connectionType.remote.candidateType);
            // console.log('connectionType.transport', result.connectionType.transport);
            //
            // console.log('bandwidth.speed', result.bandwidth.speed); // bandwidth download speed (bytes per second)
            // console.log('result.video', result.video); // bandwidth download speed (bytes per second)
            //

            this.paymentBuffer += result.video.bytesReceived - this.bytesReceived;

            console.log('this.paymentBuffer', this.paymentBuffer);

            this.zone.run(async () => {
                this.bytesReceived = result.video.bytesReceived;
            });

            if (this.paymentBuffer > 1024 * 1024 && this.id !== 'cryptomaniacs') {

                try {
                    console.log('price', this.paymentBuffer * this.price / (1024 * 1024 * 1024));

                    const payResult = await this.raidenService.pay(
                        this.tokenAddress,
                        this.id,
                        Math.ceil((this.paymentBuffer * this.price * 1e18 / (1024 * 1024 * 1024)) / 168)
                    );

                    console.log('payResult', payResult);
                } catch (e) {

                    console.log(e);
                }

                this.paymentBuffer = 0;
            }

            // to access native "results" array
            // result.results.forEach(function (item) {
            //
            //     console.log('item', item);
            //
            //     if (item.type === 'ssrc' && item.transportId === 'Channel-audio-1') {
            //         const packetsLost = item.packetsLost;
            //         const packetsSent = item.packetsSent;
            //         const audioInputLevel = item.audioInputLevel;
            //         const trackId = item.googTrackId; // media stream track id
            //         const isAudio = item.mediaType === 'audio'; // audio or video
            //         const isSending = item.id.indexOf('_send') !== -1; // sender or receiver
            //
            //         console.log('SendRecv type', item.id.split('_send').pop());
            //         console.log('MediaStream track type', item.mediaType);
            //
            //         console.log('packetsSent', packetsSent);
            //     }
            // });
        }, repeatInterval);
    }
}
