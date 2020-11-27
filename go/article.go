package main

import (
	"errors"
	"log"
)

var ErrNotFound = errors.New("not found")

type wiki struct {
	content []byte
}

var articleStore = map[string]*wiki{}

func putArticle(name string, data []byte) {
	_, ok := articleStore[name]
	if ok {
		log.Print("Updating Article")
		art, _ := articleStore[name]
		art.content = data
		return
	} else {
		articleStore[name] = &wiki{data}
	}
}

func getArticle(name string) (content []byte, err error) {
	log.Print("Looking for "+ name)
	_, ok := articleStore[name]
	if ok {
		log.Print("Found Article")
		content = articleStore[name].content
		return
	} else {
		log.Print("REALLY NOT FOUND")
		err = ErrNotFound
		return
	}
}

func listArticles() (keys []string) {
	keys = make([]string, len(articleStore))

	i := 0
	for k := range articleStore {
		keys[i] = k
		i++
	}
	return
}
