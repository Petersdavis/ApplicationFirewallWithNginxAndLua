package main

import (
	"bytes"
	"context"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"sync"
	"testing"
)

func SanityTest(t *testing.T) {
	total := 5 + 5
	if total != 10 {
		t.Errorf("Sum was incorrect, got: %d, want: %d.", total, 10)
	}
}

func TestServerGetEmptyList(t *testing.T) {
	t.Run("returns empty list", func(t *testing.T) {
		articleStore = map[string]*wiki{}
		request, _ := http.NewRequest(http.MethodGet, "/articles", nil)
		response := httptest.NewRecorder()

		listArticlesHttp(response, request)
		got := response.Body.String()
		want := "[]"
		if got != want {
			t.Errorf("got %q, want %q", got, want)
		}
	})
}

func TestServerPutItem(t *testing.T) {
	httpServerExitDone := &sync.WaitGroup{}
	httpServerExitDone.Add(1)
	srv := Server(8080, httpServerExitDone)
	defer srv.Shutdown(context.TODO())

	t.Run("item is added to articleStore", func(t *testing.T) {
		articleStore = map[string]*wiki{}
		client := &http.Client{}

		req, err := http.NewRequest(http.MethodPut, "http://localhost:8080/articles/test", bytes.NewBuffer([]byte("world")))
		if err != nil {
			panic(err)
		}

		resp, err := client.Do(req)
		if err != nil {
			panic(err)
		}
		if resp.StatusCode != 201 {
			t.Errorf("Put Article Failed, Bad Status Code got: %d, want: %d.", resp.StatusCode, 201)
		}

		result, _ := getArticle("test")
		if string(result) != "world" {
			t.Errorf("Put Article Failed, got: %s, want: %s.", result, "world")
		}
	})

	t.Run("existing item is updated", func(t *testing.T) {
		articleStore = map[string]*wiki{}
		putArticle("test", []byte("moon"))

		client := &http.Client{}

		req, err := http.NewRequest(http.MethodPut, "http://localhost:8080/articles/test", bytes.NewBuffer([]byte("world")))
		if err != nil {
			panic(err)
		}

		resp, err := client.Do(req)
		if err != nil {
			panic(err)
		}
		if resp.StatusCode != 200 {
			t.Errorf("Put Article Failed, Bad Status Code got: %d, want: %d.", resp.StatusCode, 200)
		}

		result, _ := getArticle("test")
		if string(result) != "world" {
			t.Errorf("Put Article Failed, got: %s, want: %s.", string(result), "world")
		}
	})

	t.Run("item can be retrieved", func(t *testing.T) {
		articleStore = map[string]*wiki{}
		putArticle("test", []byte("moon"))

		client := &http.Client{}

		req, err := http.NewRequest(http.MethodGet, "http://localhost:8080/articles/test", bytes.NewBuffer([]byte("")))
		if err != nil {
			panic(err)
		}

		resp, err := client.Do(req)
		if err != nil {
			panic(err)
		}
		if resp.StatusCode != 200 {
			t.Errorf("Put Article Failed, Bad Status Code got: %d, want: %d.", resp.StatusCode, 200)
		}

		got, err := ioutil.ReadAll(resp.Body)
		want := "moon"

		if string(got) != want {
			t.Errorf("Put Article Failed, got: %s, want: %s.", string(got), want)
		}
	})
}


/*
Future Tests:
extra parts in URL,
spaces in names,
capital letters


*/