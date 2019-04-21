import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from '../base/navigation.service';
import {ActivatedRoute} from '@angular/router';
import Peer from 'peerjs';
import {Web3Service} from '../utils/web3.service';
import {RaidenService} from '../utils/raiden.service';

declare const window: any;

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

    loading = false;
    receiving = false;
    videoPlayer: HTMLVideoElement;
    id;
    peer;
    remoteStream;

    tokenAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

    constructor(
        public navigationService: NavigationService,
        private route: ActivatedRoute,
        private web3Service: Web3Service,
        private raidenService: RaidenService
    ) {
    }

    @ViewChild('videoPlayer')
    set mainVideoEl(el: ElementRef) {
        this.videoPlayer = el.nativeElement;
    }

    ngOnInit() {

        this.navigationService.showBackButton = true;
        this.id = this.route.snapshot.paramMap.get('id');

        this.connect();
    }

    async connect() {

        this.loading = true;

        const signedMessage = await this.web3Service.signMessage(this.id);

        try {

            const createResult = await this.raidenService.createChannel(
                this.tokenAddress,
                this.id,
                1
            );

            console.log('createResult', createResult);
        } catch (e) {

            console.log(e);

            if (e.status !== 409 && this.id !== 'maniacs') {
                return;
            }
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
}
