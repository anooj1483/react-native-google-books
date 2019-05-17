# react-native-google-books
A React Native component for browsing google books

<img src="https://cdn.worldvectorlogo.com/logos/google-play-books.svg" data-canonical-src="https://cdn.worldvectorlogo.com/logos/google-play-books.svg" width="100" height="100" />    &nbsp;&nbsp;&nbsp;&nbsp;     <img src="http://pngimg.com/uploads/plus/plus_PNG110.png" data-canonical-src="http://pngimg.com/uploads/plus/plus_PNG110.png" width="40" height="40" />&nbsp;&nbsp;&nbsp;&nbsp; <img src="https://cdn.worldvectorlogo.com/logos/react.svg" data-canonical-src="https://cdn.worldvectorlogo.com/logos/react.svg" width="100" height="100" />

## Demo

![](https://github.com/anooj1483/react-native-google-books/blob/master/screenshots/demo.gif)

## Compatibility

<img src="http://pngimg.com/uploads/android_logo/android_logo_PNG9.png" data-canonical-src="http://pngimg.com/uploads/android_logo/android_logo_PNG9.png" width="45" height="50" />    &nbsp;&nbsp;&nbsp;&nbsp;     <img src="http://pngimg.com/uploads/apple_logo/apple_logo_PNG19682.png" data-canonical-src="http://pngimg.com/uploads/apple_logo/apple_logo_PNG19682.png" width="40" height="48" />

This react native component is purely written in Javascript and it works in both iOS and Android platforms.


## Prerequisites

Get the API key from Google Developer Console.
https://console.developers.google.com

Generate the API key and enable the Google Books API


## Usage

```js
import GoogleBookSearch from 'react-native-google-books';
```

Basic usage of GoogleBookSearch

```jsx
  <GoogleBookSearch
     apikey={"API KEY FROM DEVELOPER CONSOLE"}
     onResultPress={(book)=> console.log(book)}
  />
```
onResultPress will give you the pressed book details.

```js
     {
           id:'id of book',
           title:'name of the book',
           authors:['array of authors'],
           isbn:['isbn types'],
           raw:{}
      }
```



## Props Available


| Property      | Type           |   Default  | Required | Description  |
|---------------|----------------|------------|----------|---------------|
| apikey       |   string      |  null     |    YES      | API Key from Google Developer Console. But the search works without API key also for a limited quota|
| onResultPress       |         |       |          | Get the pressed result as callback|
| searchResult       |         |       |          | Get the raw search result as callback|
| placeholder         |   string         |  Search   |NO| Placeholder text for search box|
| value      |   string       |     | NO |Only if you want to preload any value in search |
| searchContainerStyle     |   object       |  | NO| Pass the style for the search box (container)|
| searchInputStyle     |   object       |  | NO| Pass the style for the TextInput |
| resultContainerStyle     |   object       |  | NO| Pass the style for the search result row container |
| resultItemStyle     |   object       |  | NO| Pass the style for the search result text |


All Props Usage

```jsx
<GoogleBookSearch                    
    apikey={base.strings.apikey.books}
    value={"harry potter"}
    searchContainerStyle={{marginTop:32}}
    searchInputStyle={{fontSize:16}}
    resultContainerStyle={{padding:4}}
    resultItemStyle={{color:'blue'}}
    searchResult={(result) => console.log(result)}                    
    onResultPress={(book)=> console.log(book)} 
/>
```
