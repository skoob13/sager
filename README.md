# redux-entities

This repository is the architectural proposal for Redux applications. I would like to tell the truthful story for which I feel ashamed.

## Introduction to proposal

Working on previous projects our team faced with issue of business logic organization inside a React application. Unfortunatelly, we choosed the wrong approach with Redux logic incapsulated in containers. This is  the most common approach on Medium probably.

After a time we understood, introduced approach was a mistake since the application had a lot of repeating data that was shared between different views what became a hell to handle everything in one. Nevertheless, we had more serious issues connected with async logic handling when a request logic was handled by "hands". Every JS developer should know the moment when you have to know the status of request: request successeded, failed or still in progress. Just imagine, we handled every request manually.

When we started to refactor the code base we outlined the key issues:

* Logic wasn't scalable since it was incapsulated in container.
* Logic was repeated everywhere so we had a hell of data inside.
* Every request was handled manually by special fields inside a reducer.
* Hard to understand what is really going on in business logic.
* Impossible to test the logic since it was repeated everywhere.
* Some plain and async actions were repeated between containers.

What finally led us to key features of approach we'd like to see:

* It must be scalable. Logic must be incapsulated in special module, so it can be reused by developers.
* It must automatically handle async request (for API). There are a lot of different logic wrappers for handling async requests, so it isn't a big problem to find a suitable for your project.
* It must be testable. We know some teams have a lack of time, so testing should be pleasurable and easy for them.
* It must be easy to understand the structure. Especially when your team grows fast.
* It should support principles of modern JS (code-splitting, progressive web app). It's probably the most hardest part for implementation, but the truth is that we have projects which requires these features.

It's not a strong propsal of how you should handle your data inside Redux architecture, but it introduces some rules for designing.

#### Rule #1: normalize the data

There are a lot of data inside applications. You should understand how to handle your data inside to reduce possible issues with duplicating in future. There is a perfect library for that [normalizr](https://github.com/paularmstrong/normalizr).

It takes your data and, guess what, normalizes to plain structure! Using normalization you are able to reduce potential duplicates in your logic storing entities and their keys. Let's call the objects as `example object`.

```
[{ id: 1, ...data }, { id: 2, ...data }]
``` 

becomes plain

```
{
  keys: [1, 2],
  data: { 1: {...}, 2: {...} },
}
```

As a result, you store all data of one type in separate reducer of entity `example object` and your keys stored somewhere near.
........

#### Rule #2: organize reducers

Reducers should have the next structure:

* `api` - handles async requests to API
* `entities` - contains a normalized data
* `ui` - contains a representational data.

#### Rule #3: cache the data

object hash

#### Rule #4: map the data

.map() - selectors dan

#### Rule #5: develop helpers for rendering

apihoc, entity provider


### Package config

* path
* tokenSelector
* authorizationType
* /*
hooks:
beforeRequest
request
beforeSuccess
success
beforeFailure
failure
*/

### Request config

type
reducer,
flushErrorsOnRequest,
flushReducerAction,
dispatchActions
schema
saga
effect
throttleTime
