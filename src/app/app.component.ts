import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as SimplePeer from 'simple-peer';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as videojs from 'video.js';

enum UserState {
  SENDER,
  RECEIVER
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('video')
  public videoElement: ElementRef;

  public tokenForm: FormGroup;

  public user: UserState = null;
  public userState = UserState;

  public peer: SimplePeer.Instance = null;
  private videoPlayer: videojs.Player = null;

  private mediaSource: MediaSource = new MediaSource();
  private sourceBuffer: SourceBuffer = null;
  public receivedByteArray: Uint8Array = new Uint8Array(0);

  private readonly SIGNAL_EVENT: string = 'signal';
  private readonly CONNECT_EVENT: string = 'connect';
  private readonly DATA_EVENT: string = 'data';
  private readonly STREAM_EVENT: string = 'stream';
  private readonly ERROR_EVENT: string = 'error';

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.createForms();

  }

  public ngAfterViewInit(): void {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    video.src = URL.createObjectURL(this.mediaSource);

    this.mediaSource.addEventListener('sourceopen', () => {
      this.sourceBuffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
    });
  }

  public addFile(event: Event, peer: SimplePeer.Instance): void {
    const target: any = event.target || event.srcElement;
    const file = target.files[0];

    const fileReader = new FileReader();
    const chunkSize = 16384;

    const sliceFile = (offset: number) => {
      fileReader.onload = (e: any) => {
        peer.send(e.target.result);
        if (file.size > offset + e.target.result.byteLength) {
          setTimeout(sliceFile, 0, offset + chunkSize);
        }
      };

      const slice = file.slice(offset, offset + chunkSize);
      fileReader.readAsArrayBuffer(slice);
    };

    file.createRea

    sliceFile(0);
/*    fileReader.onload = (event: any) => {
      const arrayBuffer = event.target.result;
      const byteArray = new Uint8Array(arrayBuffer);

      this.peer.send(byteArray);
      video.src = URL.createObjectURL(new Blob([byteArray]));
    };

    fileReader.readAsArrayBuffer(target.files[0]);
    console.log('Video element: ', video.src = URL.createObjectURL(target.files[0]));*/
  }

  public createPeer(initiator: boolean = false): void {
    if (this.peer === null) {
      this.peer = new SimplePeer({initiator, trickle: false, objectMode: true, reconnectTimer: 30000});

      this.user = initiator ? this.userState.SENDER : this.userState.RECEIVER;

      this.handlePeerEvent(this.peer);
    }
  }

  public connect(): void {
    const { otherToken } = this.tokenForm.value;

    if (otherToken.length > 0) {
      const otherId: string = JSON.parse(otherToken);

      this.peer.signal(otherId);
    }

  }

  private createForms(): void {
    this.tokenForm = this.fb.group({
      yourToken: '',
      otherToken: ''
    });
  }

  private handlePeerEvent(peer: SimplePeer.Instance): void {
    peer.on(this.SIGNAL_EVENT, (data: any) => {
      this.tokenForm.patchValue({
        yourToken: JSON.stringify(data)
      });
    });

    peer.on(this.ERROR_EVENT, (error: any) => {
      console.log('Error: ', error);
    });

    peer.on(this.CONNECT_EVENT, () => {
      console.log('Peer connect');
    });

    peer.on(this.DATA_EVENT, (data: Uint8Array) => {
      console.log('Peer data: ', data);
/*
      const receivedByteArray = new Uint8Array(this.receivedByteArray.length + data.length);
      receivedByteArray.set(this.receivedByteArray);
      receivedByteArray.set(data, this.receivedByteArray.length);
      this.receivedByteArray = receivedByteArray;*/
/*      const url = URL.createObjectURL(new Blob([data]));
      video.src = url;*/

/*      this.sourceBuffer.addEventListener('updateend', () => {
        if (!this.sourceBuffer.updating && this.mediaSource.readyState === 'open') {
          this.mediaSource.endOfStream();
          video.play();
        }
      });

      this.sourceBuffer.appendBuffer(data);*/
    });
  }
}
