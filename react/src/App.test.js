import React from 'react';
import { render } from '@testing-library/react';
import ViewArticle from './pages/view-article';
import { BrowserRouter as Router } from 'react-router-dom';


test('ViewArticle Attempts to Fetch the Article', () => {
  const fetchMock = jest.fn(
    (url) => {
      console.log("SEARCHING FOR URL", url)
      expect(url.indexOf("TEST")!== -1).toBe(true);
      expect(url.indexOf("8080")!== -1).toBe(true);
      return Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
        text: () => Promise.resolve("ING123")
      })
    }
  );
  // Mocking Fetch
 
  render(<Router>
    <ViewArticle match={{params:{name:"TEST"}}} fetch={fetchMock} ></ViewArticle>
    </Router>)
  expect(fetchMock.mock.calls.length).toBe(1);
});
