import {View,Text, StyleSheet,Button,TouchableOpacity, Image} from 'react-native'
import PawfectCareImage from './assets/images/PawfectCareHead.png'
import feetImage from './assets/images/petFeetHead.png'
import {loadData} from './App'


const loadScreen=({navigation,route})=>{
let {Itemid,image,content,additional,ellipse}=route.params 

return(
    <View style={styles.container}> 
        <View style={styles.loadHeaderView}>
            <Image source={PawfectCareImage} style={styles.PawfectCareImageStyle}></Image>
            <Image source={feetImage} style={styles.feetImagestyle}></Image>
           <TouchableOpacity style={styles.skipButton}
           onPress={()=>{
            navigation.navigate('signin')
           }}>
            <Text>Skip</Text>
           </TouchableOpacity>
        </View>  
             
        <Image source={image} style={{margin:20}}></Image>
        <Image source={ellipse} style={styles.ellipseStyles}></Image>
      
        <View style={{position:"absolute",bottom:40,}}>
        {additional && (
        <View style={{alignItems:"center"}}>
          {additional.images && additional.images[0] && (   
            <Image source={additional.images[0]} style={styles.image} />
          )}
          {additional.images && additional.images[1] && (
            <Image source={additional.images[1]} style={{position:"absolute",top:5,right:134}} />
          )}
          {additional.content && <Text style={{fontWeight:"bold",fontSize:24,marginBottom:10}}>{additional.content}</Text>}   
        </View>
      )}
        <Text style={styles.content}>{content}</Text>
        
        <View>
            <TouchableOpacity style={styles.NextButton}  onPress={()=>{
            
            if(Itemid<loadData.length){
                navigation.navigate('load',loadData[Itemid])
                console.log(Itemid)
            }
            else{
                navigation.navigate('signin')
            }
            }}>
               <Text style={styles.NextButtonText}>Next</Text> 
            </TouchableOpacity>
        </View>  
        </View>
    </View>
)
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center", 
        gap:10  
    },

    loadHeaderView:{   
        paddingVertical:30,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        width:"100%",
        paddingHorizontal:20, 
    },
    ellipseStyles:{
        marginTop:-150,
        zIndex:-1,
  
    },   
    feetImagestyle:{
        position:"absolute",
        right:147,
    },   
    skipButton:{
        position:"absolute",
        right:0,
        backgroundColor: '#fff',
        paddingVertical: 4,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderColor:"black", 
        marginRight:20, 
        borderWidth:2,
        
    },
    content:{  
        fontWeight:500,
        fontSize:18,
        textAlign:"center",
        paddingHorizontal:20, 
        paddingVertical:10,
    },
    NextButton:{
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor:"#64867B",
        marginVertical:20,
        borderRadius:14,
        marginHorizontal:5
        
    },
    NextButtonText:{
        color:"white",
        fontWeight:"bold",
        textAlign:"center",
        fontSize:18
    }
   
})

export default loadScreen;
