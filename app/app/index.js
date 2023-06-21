import { View, ScrollView, Alert } from 'react-native';
import { Text, Button, Checkbox, Card } from 'react-native-paper';
import FlatButton from '../custom/Button';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/globalStyles';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where, or, and } from 'firebase/firestore';
import { firestoredb } from '../firebaseconfig';
import { Drawer } from 'react-native-drawer-layout';
import { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import React from 'react';

const FilterDrawerScreen = (props) => {
  const [dessertsIsChecked, setDessertsIsChecked] = useState(false);
  const [mainsIsChecked, setMainsIsChecked] = useState(false);
  const [appetisersIsChecked, setAppetisersIsChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [complexity, setComplexity] = useState(10);
  const [categories, setCategories] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const { navigation } = props;
  
  function CategoryFilter(props) {
    const { title, checked, onPress} = props;

    return (
      <View style={{ 
        alignContent: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        }}>
        <Text style={{alignSelf: 'center'}}>{title}</Text>
        <Checkbox.Android
            status={checked ? 'checked' : 'unchecked'}
            color='gray'
            onPress={onPress}
          />
      </View>
    )
  }

  function ComplexityFilter() {

    useEffect(() => {
    }, [complexity]);
    
    return (
      <View style={{paddingLeft: 10}}>
        <Slider style={{width: 240, height: 10}}
          minimumValue={1}
          maximumValue={19}
          minimumTrackTintColor='gray'
          step={1}
          value={complexity}
          onSlidingComplete={(value) => setComplexity(value)}
          />
          <Text>
            Ingredients:{complexity}
            </Text>
        </View>
    )
  }
  function handleFilterSubmit() {
    const updatedCategories = []
    if (appetisersIsChecked) {
      updatedCategories.push("Appetisers");
    }
    if (mainsIsChecked) {
      updatedCategories.push("Mains");
    }
    if (dessertsIsChecked) {
      updatedCategories.push("Desserts");
    }
    setCategories(updatedCategories)
  }
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    console.log(complexity)
    navigation.navigate('Dishes', { categories: categories, complexity: complexity });
  }, [categories]);

  return (
    <DrawerContentScrollView scrollEnabled={false} style={{}} {...props}>
       <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderDrawerContent={() => {
        }}>
          <Text style={[globalStyles.appBodyFont, {padding: 10}]}>Category</Text>
          <CategoryFilter
            title={`Appetisers`}
            checked={appetisersIsChecked}
            onPress={() => setAppetisersIsChecked(!appetisersIsChecked)}
            />
          <CategoryFilter
            title={`Mains`}
            checked={mainsIsChecked}
            onPress={() => setMainsIsChecked(!mainsIsChecked)}
            />
          <CategoryFilter
            title={`Desserts`}
            checked={dessertsIsChecked}
            onPress={() => setDessertsIsChecked(!dessertsIsChecked)}
            />
          <Text style={[globalStyles.appBodyFont, {padding: 10, paddingTop: 20}]}>Complexity</Text>
          <ComplexityFilter />
          <Button
            mode='contained'
            buttonColor='#33e'
            onPress={handleFilterSubmit}
            style={{
              alignSelf: 'flex-start',
              margin: 10
              }}>
            Filter
            </Button>
        </Drawer>
    </DrawerContentScrollView>
  );
}

const DishCard = (props) => {
  return (
    <Card style={[globalStyles.dishesCard, {}]}>
        <Card.Title
          title={props.text}
        />
      </Card>
  )
}

const DishesScreen = ({ route }) => {
  const router = useRouter();
  const dishesRef = collection(firestoredb, 'dishes')
  const [dishes, setDishes] = useState([]);
  const { categories = [], complexity } = route.params;
  console.log(categories)

  useEffect(() => {
    if (categories === undefined || categories.length === 0) {
      setDishes([]);
      return;
    }

    const q = query(dishesRef, (where("category", "in", categories)));
  
    getDocs(q)
      .then((querySnapshot) => {
        const updatedDishes = []; // Create a new array to store the updated dishes
  
        querySnapshot.forEach((doc) => {
          updatedDishes.push({
            id: doc.id, // Add a unique identifier to each dish object
            title: doc.data().title,
          });
        });
        setDishes(updatedDishes); // Update the dishes state with the new array
      })
      .catch((error) => {
        Alert.alert.error("Error getting documents: ", error);
      });
  }, [categories]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView style={{flex: 1}}>
        {
            dishes.map((item) => {
              return (
                <DishCard key={item.key} text={item.title}/>
              )
            })
          }
          </ScrollView>
      <View style={{
          justifyContent: 'flex-end'
        }}>
        <FlatButton text = {'Reviews'} invert = {'n'} 
          onPress={() => {router.push('/review')}}
          />
        <FlatButton text = {'Back'} invert = {'n'} 
          onPress={() => router.replace('/inputs')}
          />
        </View>
    </View>
  );
}

const DrawerNav = createDrawerNavigator();

const FilterDrawer = ({route, navigation}) => {
  return (
    <DrawerNav.Navigator
    screenOptions={{
      drawerType: 'front',
    }}
      useLegacyImplementation
      drawerContent={(props) => <FilterDrawerScreen {...props} navigation={props.navigation}/>}
    >
      <DrawerNav.Screen name="Dishes" initialParams={{ categories: [], complexity: 10 }} component={DishesScreen} options={{
        headerTitleStyle: {
          ...globalStyles.appMainTitle,
          color: 'black',
        }
      }}/>
    </DrawerNav.Navigator>
  );
}

export default function Dishes() {

  return (
    <SafeAreaProvider style={[globalStyles.container]}>
      <FilterDrawer />
    </SafeAreaProvider>
  );
}
// import { useEffect, useState } from 'react';
// import { SafeAreaView, Text, View, TextInput, Alert } from 'react-native';
// import { globalStyles } from '../styles/globalStyles';
// import FlatButton from '../custom/Button';
// import { auth } from '../firebaseconfig';
// import { signInWithEmailAndPassword } from "firebase/auth"; 
// import { Link, useRouter } from 'expo-router';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from "expo-auth-session/providers/google";

// WebBrowser.maybeCompleteAuthSession();

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const router = useRouter();
//   const [accessToken, setAccessToken] = useState("");
//   const [userInfo, setUserInfo] = useState(null);

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     //iosClientId : "330002817844-obhdei0qtbfqro1vmbl592cq8923ah5c.apps.googleusercontent.com",
//     expoClientId : "330002817844-gcndolvp2hu7e71o0l4t3ak73658p1ss.apps.googleusercontent.com",
//     webClientId : "330002817844-gcndolvp2hu7e71o0l4t3ak73658p1ss.apps.googleusercontent.com",
//     scopes: ['profile', 'email'],
//   });

//   const handleLogin = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then(() => {
//         router.replace("/inputs")
//       })
//       .catch((error) => Alert.alert(error.message))
//     };

//   const handlePassword = () => {
//     router.replace("/password");
//   }

//   useEffect(() => {
//     if (response?.type === "success") {
//       setAccessToken(response.authentication.accessToken);
//       getUserInfo();
//     }
//     else{
//       console.log(response?.type);
//     }
//   }, [response, accessToken]);
  

//   const getUserInfo = async () => {
//     try {
//       const response = await fetch(
//         "https://www.googleapis.com/userinfo/v2/me",
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       const user = await response.json();
//       setUserInfo(user);
//       router.replace("/inputs");
//     } catch (error) {
//       console.log("userInfo error");
//     }
//   };


//   return (
//     <SafeAreaView style = {globalStyles.container}>

//       <View style = {globalStyles.appHeader}>
//         <Text style = {globalStyles.appMainTitle}>FOOD4THOUGHT</Text>
//       </View>

//       <View style = {globalStyles.appBody}>
//         <Text style = {globalStyles.appBodyFont}> Say hello to endless culinary possibilities! </Text>
//       </View>

//       <View style = {globalStyles.appLogin}>
//         <Text style = {[globalStyles.appBodyFont, 
//           {fontSize: 35, fontWeight: '700', alignSelf: 'center', marginVertical: 15,}]}>
//           Login
//           </Text>
//         <TextInput 
//           style = {globalStyles.userInputs} 
//           autoCapitalize='none' 
//           keyboardType = 'email-address' 
//           placeholder='Email' 
//           value={email}
//           onChangeText={text => setEmail(text)} 
//           />
//         <TextInput 
//           style = {globalStyles.userInputs} 
//           blurOnSubmit = {true}  
//           placeholder='Password'
//           value={password}
//           onChangeText={text => setPassword(text)}
//           secureTextEntry
//         />

//         <FlatButton text={'Sign In'} onPress={handleLogin} invert={'n'} disabled={false}/>
//         <FlatButton text={'Sign In with Google'} onPress = {() => promptAsync()} invert={'n'} disabled={false}/>
//         <FlatButton text={'Forget Password'} onPress={handlePassword} invert={'y'} disabled={false}/>
//         <View style = {{flexDirection: 'row', alignItems: 'flex-end',}}>
//             <Text style = {[globalStyles.appBodyFont, {fontSize: 15, marginTop: 200}]}>Don't have an account?&nbsp;</Text>
//             <Link href="/signUp" style = {{color:'blue', fontFamily: 'Futura-Medium',}}> 
//               Sign Up
//               </Link>
//         </View>
//       </View>

//     </SafeAreaView>
//   );
// }
