import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from '../base/navigation.service';
import Peer from 'peerjs';
import {ActivatedRoute} from '@angular/router';

declare const navigator: any;

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

    constructor(
        public navigationService: NavigationService,
        private route: ActivatedRoute
    ) {
    }

    @ViewChild('videoPlayer')
    set mainVideoEl(el: ElementRef) {
        this.videoPlayer = el.nativeElement;
    }

    ngOnInit() {

        this.navigationService.showBackButton = true;
        this.id = this.route.snapshot.paramMap.get('id');
    }

    publish() {

        // const id = Math.random().toString(36).substr(2, 9);
        const id = 'NUTUBE_NETWORK_' + (this.id ? this.id : Math.random().toString(36).substr(2, 9));

        this.peer = new Peer(id);

        this.peer.on('open', () => {
            // console.log('PeerID:', this.peer.id);
        });

        this.peer.on('error', (err) => {

            console.error(err);
        });

        this.peer.on('call', (call) => {

            // console.log('Income call', call);
            // console.log('Stream', this.stream);

            this.connections++;

            console.log('New connection', this.connections);

            if (this.connections < 30) {

                call.answer(this.stream);

                call.on('stream', (remoteStream) => {
                    // console.log('remoteStream', remoteStream);
                });

                call.on('error', (err) => {
                    console.log('Error', err);
                });

                // Handle when the call finishes
                call.on('close', () => {

                    this.connections--;
                    console.log('The videocall has finished', this.connections);
                });
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
}
