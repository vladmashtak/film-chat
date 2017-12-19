import { WebrtcPage } from './app.po';

describe('webrtc App', () => {
  let page: WebrtcPage;

  beforeEach(() => {
    page = new WebrtcPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
