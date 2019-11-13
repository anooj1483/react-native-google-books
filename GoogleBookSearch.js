/*
 * @Author: Anooj Krishnan G 
 * @Date: 2019-05-17 19:40:13 
 * @Last Modified by: Anooj Krishnan G
 * @Last Modified time: 2019-11-13 23:05:58
 */

import React from 'react';
import PropTypes from 'prop-types'
import {TouchableHighlight, StyleSheet, Text, View, Dimensions, FlatList, TextInput} from 'react-native';
import BookSearch from './BookSearch'

const {height, width} = Dimensions.get('screen');

export default class GoogleBookSearch extends React.Component{
   static propTypes = {        
       apikey: PropTypes.string,   
       placeholder:PropTypes.string, 
       limit:PropTypes.number,    
       onTextChange: PropTypes.func,
       searchContainerStyle:PropTypes.object,
       searchInputStyle:PropTypes.object,
       resultContainerStyle:PropTypes.object,
       resultItemStyle:PropTypes.object,
       showSearchResult:PropTypes.bool,
       searchResult:PropTypes.func,
       onResultPress:PropTypes.func,
       keyboardType:PropTypes.string,
       returnKeyType:PropTypes.string,        
       onSubmitEditing:PropTypes.func,        
       value:PropTypes.string,
       interval:PropTypes.number
   };
   static defaultProps = {        
       apikey: "",        
       theme:'light', 
       placeholder:"Search",
       keyboardType:'default',
       returnKeyType:'done',        
       value:"",
       limit:-1,
       showSearchResult:true,
       interval:800
   };

   constructor(props) {
       super(props);    
       this.state={
           gbooks:[],
           typing: false,
            typingTimeout: 0,
            showcontainer:true,
            searchval:this.props.value
       } 
       this.searchBook = this.searchBook.bind(this);       
       this.onTextChange = this.onTextChange.bind(this); 
       this.onResultPress = this.onResultPress.bind(this);
       this.searchResult = this.searchResult.bind(this);
   }

   renderGBooks(item, index){
       let book = item;
       let name = item.volumeInfo.title
       var thumbnail = {
            small:"",
            normal:""
        }
        if(book.volumeInfo != undefined 
            && book.volumeInfo.imageLinks != undefined){
               thumbnail.small = book.volumeInfo.imageLinks.smallThumbnail!=undefined?book.volumeInfo.imageLinks.smallThumbnail:null;
               thumbnail.normal = book.volumeInfo.imageLinks.thumbnail!=undefined?book.volumeInfo.imageLinks.thumbnail:null;
        }
       let obj = {
           id:item.id,
           title:name,
           authors:item.volumeInfo.authors,
           isbn:item.volumeInfo.industryIdentifiers,
           raw:item,
           smallThumbnail:thumbnail.small,
           thumbnail:thumbnail.normal
       }
       return(
           <TouchableHighlight 
                onPress={()=>this.onResultPress(obj)}
                underlayColor={'transparent'}
                >
                <View style={[styles.resultItem,{...this.props.resultContainerStyle}]}>
                    <Text style={{...this.props.resultItemStyle}}>{obj.title}</Text>
                </View>
                
           </TouchableHighlight>
       )
   }

   onResultPress(book){
        if (this.props.onResultPress !== undefined) {
            this.setState({showcontainer:false,searchval:book.title})
            this.props.onResultPress(book)
        }
   }

   searchResult(){
    if (this.props.searchResult !== undefined) {
        this.props.searchResult(this.state.gbooks)
    }
   }

   onTextChange(val){       
       this.setState({searchval:val})
       if(val.length == 0){
        this.setState({showcontainer:false})
       }
        if(val.length > 2){
            if(!this.state.showcontainer){
                this.setState({showcontainer:true})
            }
            const self = this;

            if (self.state.typingTimeout) {
                clearTimeout(self.state.typingTimeout);
            }
            self.setState({                
                typing: false,
                typingTimeout: setTimeout(function () {
                    self.searchBook(val);
                }, self.props.interval)
            });
        }
   }

   async searchBook(val){
        let self = this;
        if(val.length > 2){            
            let res = await BookSearch.searchbook(val, this.props.apikey);                   
            if(res.status 
                && res.data != undefined){
                    console.log(res.data)
                    var booksArray = res.data;
                    if(self.props.limit != -1){
                        if(booksArray.length > self.props.limit){
                            let sliced = booksArray.slice(0,self.props.limit)
                            booksArray = sliced;
                        }
                    }
                    this.setState({gbooks:booksArray},()=>{
                        self.searchResult()
                    })
            }
        }
        
   }

   render(){
        return(
            <View 
                style={[styles.container,{...this.props.searchContainerStyle}]}>
                
                <TextInput
                    value={this.state.searchval}
                    style={[styles.input,{...this.props.searchInputStyle}]}
                    placeholder={this.props.placeholder}
                    clearButtonMode={'while-editing'}
                    onChangeText={(text) => this.onTextChange(text)}
                 />
                 {
                     (this.props.showSearchResult && this.state.showcontainer)?
                    <View style={styles.resultContainer}>
                        <FlatList
                            keyboardDismissMode={'on-drag'}
                            renderItem={(item) => this.renderGBooks(item.item, item.index)}
                            data={this.state.gbooks}                                                
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>:<View />
                 }

            </View>
        )
   }
   

}

const styles = StyleSheet.create({
    container:{
        zIndex: 10,
        overflow: 'visible',
        marginTop:24,        
        borderTopWidth: 0,
        borderBottomWidth: 0,
        height: 50,        
        width:width-16,
        alignSelf:'center',
        backgroundColor: "#fff",
        borderColor:"#f6f6f6",
        borderWidth:0.7,
        borderRadius:5,
        shadowOpacity: 0.0015 * 5 + 0.18,
        shadowRadius: 0.54 * 5,
        shadowOffset: {
            height: 0.6 * 5,
        },
        justifyContent:'center'
    },
    input:{
        backgroundColor: 'transparent',
        fontSize: 15,
        lineHeight: 22.5,
        paddingBottom: 0,
        paddingHorizontal:8,
        flex: 1
    },
    resultContainer:{
        position: 'absolute',
        top: 60,
        left: 8,
        right: 8,
        backgroundColor: '#FFF',
        borderRadius: 5,
        flex: 1,
        elevation: 3,
        zIndex: 10,
        shadowOpacity: 0.0015 * 5 + 0.18,
        shadowRadius: 0.54 * 5,
        shadowOffset: {
            height: 0.6 * 5,
        },
        
    },
    resultItem:{
        height:50,
        paddingHorizontal:8, 
        paddingVertical:4,
        justifyContent:'center',
        borderBottomWidth:0.8,
        borderBottomColor:"#f6f6f6",
        margin:2
              
    },
    resultText:{
        fontWeight:'300',
        alignSelf:'center'
        
    }
})