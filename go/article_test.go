package main

import "testing"

func index(slice []string, item string) int {
	for i, _ := range slice {
			if slice[i] == item {
					return i
			}
	}
	return -1
}

func TestPutArticle(t *testing.T) {
	articleStore = map[string]*wiki{}
	putArticle("hello", []byte("world"))
	result, _ := getArticle("hello")
	if string(result) != "world" {
		t.Errorf("Put Article Failed, got: %s, want: %s.", result, "world")
	}
}

func TestReplaceArticle(t *testing.T) {
	articleStore = map[string]*wiki{}
	putArticle("hello", []byte("world"))
	putArticle("hello", []byte("moon"))
	result, _ := getArticle("hello")
	if string(result) != "moon" {
		t.Errorf("Put Article Failed, got: %s, want: %s.", result, "moon")
	}
}

func TestArticleNotFound(t *testing.T) {
	articleStore = map[string]*wiki{}
	putArticle("hello", []byte("world"))
	putArticle("hello", []byte("moon"))
	result, err := getArticle("world")
	if err != ErrNotFound {
		t.Errorf("Expected Err Not Found for Missing Article")
	}
	
	if string(result) != "" {
		t.Errorf("Expected Empty String for Missing Article")
	}

}


func TestArticleList(t *testing.T) {
	articleStore = map[string]*wiki{}
	putArticle("hello", []byte("world"))
	putArticle("hello", []byte("moon"))
	putArticle("goodbye", []byte("world"))
	list := listArticles()
	idHello := index(list, "hello")
	if idHello == -1 {
		t.Errorf("Failed to find key hello")
	}
	idGoodbye := index(list, "goodbye")
	if idGoodbye == -1 {
		t.Errorf("Failed to find key goodbye")
	}

	if len(list) != 2 {
		t.Errorf("Incorrect Length of list")

	}
}