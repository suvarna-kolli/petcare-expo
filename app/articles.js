import {View,Text,StyleSheet,Image, TouchableOpacity} from 'react-native'
import articleImage from './assets/images/dayCareNearYou.png'
import { FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const animals=[{name:"dog"},{name:"pet"},{name:"husky"},{name:"care"}]
export const ArticleDetailsScreen=({navigation})=>{
    return(
        <ScrollView>
        <View style={{padding:10}}>
           <View style={{margin:20,height:200}}>
           <Image source={articleImage} resizeMode='cover'style={{width:"100%",height:"100%",borderRadius:14}}></Image>
           </View>
           <View style={{flexDirection:"row", justifyContent:"flex-start",alignItems:"center",marginLeft:20}}>
            {animals.map((item)=>{
                return(
                    
                        <Text style={{padding:5,borderWidth:1,borderRadius:8,borderColor:"grey",margin:5}}>{item.name}</Text>         
                )
            })}</View>
            <Text style={{fontWeight:500,fontSize:16}}>Your Dog’s Best Life Starts Here</Text>
            <Text style={{flexWrap:"wrap"}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text> 
                <Text style={{fontSize:16,fontWeight:500,}}>Where does it come from?          </Text>
               <Text>   
               Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                </Text> 
                <Text style={{fontSize:16,fontWeight:500,}}>Where can I get some? </Text>
                <Text style={{flexWrap:"wrap"}}>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                </Text>
            
           
        </View>
        </ScrollView>
    )
}

const ArticlesScreen=({navigation})=>{

    const articleData=[{id:1,image:articleImage},{id:2,image:articleImage},{id:3,image:articleImage},{id:4,image:articleImage},]
    return(
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <FlatList
        keyExtractor={(item)=>item.id}
        data={articleData}
        renderItem={({item})=>{
            return(
                <TouchableOpacity onPress={()=>{navigation.navigate('Article info')}}>
                <View style={styles.container}>
                    <Image source={item.image} style={{width:"100%",borderTopRightRadius:14,borderTopLeftRadius:14}}></Image>
                    <Text style={{fontWeight:500,fontSize:16,paddingTop:10,marginLeft:10}}>Your Dog’s Best Life Starts Here</Text>
                    <Text style={{flexWrap:"wrap",color:"grey",fontSize:12,padding:10}}>Welcome to a treasure trove of knowledge tailored for dog lovers!  
                    Whether you're a first-time owner or a seasoned dog parent,.....</Text>
                </View>
                </TouchableOpacity>
            )
        }}
        />
         </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
     
      borderRadius: 14,
      elevation: 3, // Shadow for Android
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      margin:10
    },
})
export default ArticlesScreen;