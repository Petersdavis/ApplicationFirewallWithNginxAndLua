package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"
	"unicode"

	"github.com/gorilla/mux"
)

func hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "hello\n")
}

func putArticleHttp(w http.ResponseWriter, r *http.Request) {
	/*
	*  If the article exists update it and return 200 OK   {else} create the article and return 201 CREATED
	 */

	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method == http.MethodOptions {
		return
	}
	vars := mux.Vars(r)
	name := vars["name"]

	name = strings.Map(func(r rune) rune {
		if unicode.IsGraphic(r) {
			return r
		}
		return -1
	}, name)

	content, _ := ioutil.ReadAll(r.Body)

	_, err := getArticle(name)
	if err != ErrNotFound {
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusCreated)
	}
	putArticle(name, content)
}

func getArticleHttp(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method == http.MethodOptions {
		return
	}

	vars := mux.Vars(r)
	name := vars["name"]

	name = strings.Map(func(r rune) rune {
		if unicode.IsGraphic(r) {
			return r
		}
		return -1
	}, name)

	for key, value := range articleStore {
		if strings.Compare(key, name) == 0 {
			log.Print("FFIN FOUND IT")
		} else {
			fmt.Println("A:", key, "B:", name, "NOT EQUAL", len(key), len(name))
		}
		fmt.Println("Key:", key, "Value:", value)
	}

	/*
	*  If the article exists return 200 OK Content-Type: text/html with the article {else} return 404 Not Found
	 */

	val, ok := articleStore[name]
	fmt.Println("OK:", ok, "Value:", val)
	content, err := getArticle(name)
	if err != ErrNotFound {
		w.WriteHeader(http.StatusOK)
		w.Write(content)
	} else {
		w.WriteHeader(http.StatusNotFound)

	}
}

func listArticlesHttp(w http.ResponseWriter, r *http.Request) {
	/*
	* GET /articles/ HTTP/1.1 200 OK
	* Content-Type: application/json
	* The payload is a JSON array listing the names of all stored articles
	 */

	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method == http.MethodOptions {
		return
	}
	list := listArticles()
	js, err := json.Marshal(list)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)

}

func Server(port int, wg *sync.WaitGroup) (srv *http.Server) {
	articleStore = map[string]*wiki{}
	r := mux.NewRouter()
	r.HandleFunc("/articles", listArticlesHttp).Methods(http.MethodGet, http.MethodOptions)
	r.HandleFunc("/articles/{name}", putArticleHttp).Methods(http.MethodPut, http.MethodOptions)
	r.HandleFunc("/articles/{name}", getArticleHttp).Methods(http.MethodGet, http.MethodOptions)
	r.Use(mux.CORSMethodMiddleware(r))

	log.Print("Listening on Port: " + strconv.Itoa(port))
	srv = &http.Server{
		Handler: r,
		Addr:    "0.0.0.0:" + strconv.Itoa(port),
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	go func() {
		defer wg.Done() // let main know we are done cleaning up

		// always returns error. ErrServerClosed on graceful close
		if err := srv.ListenAndServe(); err != http.ErrServerClosed {
			// unexpected error. port in use?
			log.Fatalf("ListenAndServe(): %v", err)
		}
	}()
	return srv

}

func main() {
	httpServerExitDone := &sync.WaitGroup{}
	httpServerExitDone.Add(1)

	_ = Server(8080, httpServerExitDone)
	log.Printf("Server Started on Port 8080")
	(chan int)(nil) <- 0

}
