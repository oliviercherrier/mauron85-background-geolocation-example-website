import { Mauron85BackgroundGeolocationExampleWebsitePage } from './app.po';

describe('mauron85-background-geolocation-example-website App', function() {
  let page: Mauron85BackgroundGeolocationExampleWebsitePage;

  beforeEach(() => {
    page = new Mauron85BackgroundGeolocationExampleWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
