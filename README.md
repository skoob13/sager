# redux-entities

[![Coverage Status](https://coveralls.io/repos/github/skoob13/sager/badge.svg?branch=master)](https://coveralls.io/github/skoob13/sager?branch=master)

## Introduction to proposal

Repository proposes a set of organization rules for Redux logic based on entities approach.

### Entitiy definition

Basically, `entity` represents a data structure receiving from API. These entities are organized to the reducer called `entities`. It doesn't restrict you to create a different entities that you would like to store.

### Results mapping

It depends on API design, but usually it has a set of filters. Therefore, data can duplicate sometimes. But instead of duplicating, you can store the keys of exact filter and then map the datasource by array of keys. Example follows.

Nested data

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

so you're able to map the keys by datasource

```
keys.map(key => data[key])
```

It usually called [selectors](https://redux.js.org/recipes/computing-derived-data). Selectors give you powerful features for searching, filtering and processing your data.

### Normalization

Two previous definitions are the parts of **normalization**. Normalization could make a deep and nested object to simple plain. Without a doubt, working with a plain data makes developer's life much easier. There is a perfect library for that [normalizr](https://github.com/paularmstrong/normalizr).

### Handling reducers

Reducers should have the next structure:

* `api` - handles async requests to API, flushes on next session.
* `entities` - contains a normalized data, caches and stores for some period.
* `ui` - contains a representational data, flushes on next session.

PWA principles requires you to cache the data to follow a mobile application experience. Without data caching, user could be confused by the mobile app since it works with connection only.


### Handling entities

Since on previous steps you've got a definition of normalization, you should find a way to handle the normalized data. We suggest to store data objects in simple reducers and results in special reducer that could work as hashtable where keys are `hashes of requests` and values are `results` of requests (array of keys, id or other metadata).

Hash function can be whatever you like. Nevertheless, you probably care about the bundle size, so you're able to use JSON serialization as hash function. For example, `object-hash` has a gzipped weight in 36 Kb.

Following is the example of entities reducer.

```
{
  results: {
    '{"endpoint": "posts"}': [1, 2, 3],
    'some_other_hash_function': [1, 2, 3],
  },
  posts: {
    1: { id: 1 },
    2: { id: 2 },
    3: { id: 3 },
  },
}
```

Then using a hash function and filters, you are able to map the data

```
entities.results[JSON.stringify(action)].map(key => entities.posts[key])
```

#### Why hash function is better than object

Basically every developer would like to minify amount of work required for data processing. Hash function could reduce amount of possible work connected with entities' processing. Obviously, there are moments when you would like to control processing, but for most cases a hash works for you.

From the other side of question, hash keys could remove nesting from results. Let's assume next example.

```
results: {
  business: {
    1: {
      feed: {
        list: [1, 2, 3],
        favorite: [2],
      }
    }
  }
}
```

Could be plained to hash of meta objects, that represents the request:

```
{
  businessId: 1,
  entity: 'feed',
  filter: 'list',
}, {
  businessId: 1,
  entity: 'feed',
  filter: 'favorite',
}
```

So using a hash function provide you plain structure of results reducer

```
results: {
  "{"businessId":1,"entity":"feed","filter":"list"}": [1, 2, 3],
  "{"businessId":1,"entity":"feed","filter":"favorite"}": [2],
}
```

Mapping of plain data becomes as

```
entities.results[JSON.stringify(action)].map(key => entities.posts[key])
```

Instead of

```
entities.results.business.1.feed.list.map(key => entities.posts[key])
```

### Data mapping

Since now you use an array of keys and an object table, you have to map your data. This methodology called [selectors](https://redux.js.org/recipes/computing-derived-data). Using selectors you are able to create additional data mappers. For example, on React you can create `EntitiyProvider` which maps, paginates and virtualizes (if you need) your data.

```
<EntityProvider
  meta={{
    businessId: this.props.match.params.businessId,
    filter: this.state.filter,
    entity: 'feed',
  }}
  action={apiActions.getPosts}
>
  {items => items.map(name => <Item>{name}</Item>)}
</EntitiyProvider>
```

This provide you powerful control on how your data displays. `EntityProvider` component is a custom component that connected to `Redux`.

In addition, you could use HOCs. They provide less control on data representation, but data rendering becomes more easier.

## Documentation

### Basic usage

```
import entityFactory, { typeCreator } from 'redux-entities';

// Define a type
const getPosts = typeCreator({
  type: 'posts/get',
  reducer: 'getPosts',
});

// Define a selector for Authorization token
const tokenSelector = state => state.entities.auth.token;

// Create reducers and sagas
const { reducers, sagas } = entityFactory({
  tokenSelector,
  authorizationType: 'bearer',
  path: 'https://api.com/v1',
});

// Combine reducers with your
const reducers = combineReducers({
  api: reducers,
});

// Run sagas
sagaMiddleware.run(function* () {
  for (const saga of sagas) {
    yield spawn(saga);
  }
});
```

### entitiyFactory

| Property          | Required | Description                             |
|-------------------|----------|-----------------------------------------|
| authorizationType | no       | Describes token type (bearer, JWT etc.) |
| hooks             | no       | Object of hooks                         |
| path              | no       | API prefix for requests                 |
| tokenSelector     | no       | Selector for authorization token        |

#### Hooks

All hooks are functions or generators that suitable for `redux-saga` `call` effect.

##### hooks.beforeRequest

Calls before sending a request to API. Params:

* request - request configuration

```
request => console.log(request.url)
```

##### hooks.request

Calls after a successful request to API. Params:

* request - request configuration

```
request => console.log(request.url)
```

##### hooks.beforeSuccess

Calls before putting a success action, but after normalization. Here you are able to modify response, inject additional data and etc. Param's fields:

* request - request configuration
* payload - normalized data if there is a schema or result
* result - direct data from API
* withScema - indicates schema (boolean)

**Must** return a data or undefined will be dispatched

```
({ request, payload, result, withSchema }) => {
  console.log(result)
  return payload;
}
```

##### hooks.success

Calls after putting a success action. Param's fields:

* request - request configuration
* payload - normalized data if there is a schema or result
* result - direct data from API
* withScema - indicates schema (boolean)

```
({ request, payload, result, withSchema }) => console.log(result);
```

##### hooks.beforeFailure

Calls before dispatching a failure action. Param's fileds:

* request - request configuration
* error - error from `try/catch` block (could be API error or custom saga/function error)

```
({ request, error }) => console.log(request.url)
```

##### hooks.failure

Calls after dispatching a failure action. Param's fileds:

* request - request configuration
* error - error from `try/catch` block (could be API error or custom saga/function error)

```
({ request, error }) => console.log(request.url)
```

### typeCreator

Creates a type, reducer and saga for request. 

| Property             | Required | Default   | Description                                                                   |
|----------------------|----------|-----------|-------------------------------------------------------------------------------|
| type                 | yes      | -         | Name of type, action type will have a template: `@@api/${type}/${lifecycle}`  |
| reducer              | yes      | -         | Name of reducer in API reducers                                               |
| flushErrorsOnRequest | no       | false     | Reducer will flush errors on each request if value is true                    |
| flushReducerAction   | no       | null      | Action name for API reducer flushing                                          |
| dispatchActions      | no       | true      | If false, generated saga won't dispatch actions for success or failure events |
| schema               | no       | null      | Normalization schema for successful request                                   |
| saga                 | no       | null      | Custom processing saga or function                                            |
| effect               | no       | takeEvery | Custom saga effect for request event                                          |
| throttleTime         | no       | 500       | Time for throttling effect in ms                                              |

Returns a plain object with three fields:

```
{
  request: '@@api/type/request',
  success: '@@api/type/success',
  failure: '@@api/type/failure',
}
```

Example:

```
const getPosts = typeCreator({
  type: 'posts/get',
  reducer: 'getPosts',
});
```

Action structure:

```
const getPosts = (headers, body, params) => ({
  type: types.getPosts.request,
  method: 'get',
  url: 'posts/',
  request: {
    body,
    headers,
    params,
  },
});
```

Notes:

* Saga will run only on corresponding `request` action.
* Every `success` action has also the `action` field, which gives you an original action.
* `params`, `headers` and `body` will automatically serialize.
* `url` could be an actual url and it won't be prefixed.

### makeRequest

Helper function for requests. Has next structure:

```
(options, extenders) => axios[method](...)
```

So there are next available options:

* authorizationType
* method
* path
* token
* url
* request

## Licence

MIT
