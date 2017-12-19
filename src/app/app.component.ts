import { Component, OnInit } from '@angular/core';
import * as SimplePeer from 'simple-peer';
import { FormBuilder, FormGroup } from '@angular/forms';

enum UserState {
  SENDER,
  RECEIVER
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public tokenForm: FormGroup;

  private peer: SimplePeer.Instance = null;

  public user: UserState = null;
  public userState = UserState;

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

  public createPeer(initiator: boolean = false): void {
    if (this.peer === null) {
      this.peer = new SimplePeer({initiator, trickle: false});

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

    peer.on(this.DATA_EVENT, (data) => {
      console.log('Peer data: ', data);
    });
  }
}
