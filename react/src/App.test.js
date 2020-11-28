import React from 'react';
import { render } from '@testing-library/react';
import ViewArticle from './pages/view-article';
import { BrowserRouter as Router } from 'react-router-dom';
import EditArticle from './pages/edit-article';

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

test('EditArticle Fetchs the Article', () => {
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
      <EditArticle match={{params:{name:"TEST"}}} fetch={fetchMock} ></EditArticle>
    </Router>)
  expect(fetchMock.mock.calls.length).toBe(1);
});

test('Saving the Article Triggers a Put Request', () => {
  const fetchMock = jest.fn(
    (url, options) => {
      if(options.method === "PUT"){
        expect(options.body).toBe("HELLO_WORLD");
        return Promise.resolve({
          status:200,
        })
      } else {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
          text: () => Promise.resolve("HELLO_WORLD")
        })
      }

    }
  );
  let editArticle =  new EditArticle({match:{params:{name:"TEST"}}, fetch:fetchMock});
  editArticle.state.content = "HELLO_WORLD";
  editArticle.saveContent();

  // Mocking Fetch
 
  render(<Router>
    <EditArticle match={{params:{name:"TEST"}}} fetch={fetchMock} ></EditArticle>
    </Router>)
  expect(fetchMock.mock.calls.length).toBe(2);
});