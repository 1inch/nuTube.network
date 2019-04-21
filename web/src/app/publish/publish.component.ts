import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from '../base/navigation.service';
import Peer from 'peerjs';
import {ActivatedRoute} from '@angular/router';
import {Web3Service} from '../utils/web3.service';
import {RaidenService} from '../utils/raiden.service';

declare const navigator: any;
declare const require: any;

const getStats = require('getstats');

@Component({
    selector: 'app-publish',
    templateUrl: './publish.component.html',
    styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

    publishing = false;
    stream: MediaStream;
    videoPlayer: HTMLVideoElement;
    peer: Peer;
    id;
    connections = 0;
    maxConnections = 25;
    bytesSend = [];
    users = [];

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

    async ngOnInit() {

        this.navigationService.showBackButton = true;
        this.id = this.route.snapshot.paramMap.get('id');

        if (!this.id) {
            this.id = await this.web3Service.provider.getSigner(0).getAddress();
        }
    }

    async publish() {

        // const id = Math.random().toString(36).substr(2, 9);
        const id = 'NUTUBE_NETWORK_' + this.id;

        this.peer = new Peer(id);

        this.peer.on('open', () => {
            // console.log('PeerID:', this.peer.id);
        });

        this.peer.on('error', (err) => {

            console.error(err);
        });

        this.peer.on('open', () => {
            console.log('PeerID:', this.peer.id);
        });

        this.peer.on('connection', function (connection) {

            console.log('connection', connection);

            connection.on('data', (data) => {

                console.log('Data from connection', data);
            });

        });

        this.peer.on('call', async (call) => {

            console.log('Income call', call);
            // console.log('Stream', this.stream);

            this.connections++;

            console.log('New connection', this.connections);

            if (this.connections < this.maxConnections) {

                this.handleCall(call);
            } else {

                console.log('To many connections. Call declined!', this.connections);
            }

            // use call.close() to finish a call
        });

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia({
            video: {
                width: {min: 1024, ideal: 1280, max: 1920},
                height: {min: 576, ideal: 720, max: 1080},
                facingMode: 'user'
            },
            audio: true
        }, (stream) => {

            this.publishing = true;

            this.videoPlayer.srcObject = stream;
            this.videoPlayer.play();
            this.stream = stream;
        }, (err) => {
            console.error('Failed to get local stream', err);
        });
    }

    stop() {

        this.peer.destroy();
        this.publishing = false;
        this.videoPlayer.pause();
        this.stream.getTracks().map((val) => {
            val.stop();
        });
    }

    initStatus(user, peerConnection) {

        const repeatInterval = 2000; // 2000 ms == 2 seconds

        // console.log('Peer', peerConnection);

        getStats(peerConnection, (result) => {

            // console.log('remote.ipAddress', result.connectionType.remote.ipAddress);
            // console.log('remote.candidateType', result.connectionType.remote.candidateType);
            // console.log('connectionType.transport', result.connectionType.transport);
            //
            // console.log('bandwidth.speed', result.bandwidth.speed); // bandwidth download speed (bytes per second)
            // console.log('bytesSent', result.video.bytesSent); // bandwidth download speed (bytes per second)
            //
            this.bytesSend[user] = result.video.bytesSent;

            console.log('User: ' + user + ' => ' + result.video.bytesSent);

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

    async handleCall(call) {

        this.users[call.peer] = this.web3Service.messageRecover(this.id, call.metadata);
        console.log('Address', this.users[call.peer]);

        try {

            if (this.id !== 'maniacs') {

                const channels = await this.raidenService.getChannels(
                    this.tokenAddress,
                    this.users[call.peer]
                );

                console.log('channels', channels);
            }

        } catch (e) {

            console.log('Error', e);
        }

        call.answer(this.stream);

        call.on('stream', (remoteStream) => {
            // console.log('remoteStream', remoteStream);
        });

        call.on('error', (err) => {
            console.log('Error', err);

            this.connections--;
        });

        // Handle when the call finishes
        call.on('close', () => {

            this.connections--;
            console.log('The videocall has finished', this.connections);
        });

        this.initStatus(call.peer, call.peerConnection);
    }
}
