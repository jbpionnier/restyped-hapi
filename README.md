# RESTyped Hapi Wrapper

Hapi route wrappers for declaring type-safe APIs with [RESTyped](https://github.com/rawrmaan/restyped).

Inspired by [restyped-express-async](https://github.com/rawrmaan/restyped-express-async)

## :blue_book: Usage

`npm install restyped-hapi`
****
It's just like normal hapi, except you'll need to provide a RESTyped API definition file for the API you want to use, and return a Promise with your response value in order to activate type-checking.

```typescript
import RestypedRouter from 'restyped-hapi'
import { MyAPI } from './MyAPI' // <- Your API's RESTyped defintion
import * as Hapi from 'hapi'

const server = new Hapi.Server()
const route = RestypedRouter<GiphyAPI>(server)

// You'll get a compile error if you declare a route that doesn't exist in your API defintion.
route({
  method: 'POST',
  path: '/login',
  async handler(request) {
    // Error if you try to access body properties that don't exist in your API definition.`
    const { username, password, twoFactorPin } = request.payload
    //      ^ string  ^ string  ^ number
  
    const accessToken = await User.login(username, password, twoFactorPin)
  
    // Error if you don't return the response type defined in your API defintion.
    return accessToken
  },
})
```
