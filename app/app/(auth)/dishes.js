import { View } from 'react-native';
import { Text, Button, Checkbox } from 'react-native-paper';
import FlatButton from '../../custom/Button';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/globalStyles';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { firestoredb } from '../../firebaseconfig';
import { Drawer } from 'react-native-drawer-layout';
import { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';


function CustomDrawerContent(props) {
  const [dessertsIsChecked, setDessertsIsChecked] = useState(false);
  const [mainsIsChecked, setMainsIsChecked] = useState(false);
  const [appetisersIsChecked, setAppetisersIsChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [complexity, setComplexity] = useState(10);
  const [sliding, setSliding] = useState('Inactive');
  
  function CategoryFilter(props) {
    const { title, checked, onPress } = props;

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
  const handleComplexity = (value) => {
    setSliding('Inactive');
    setComplexity(value);
  };

  useEffect(() => {
  }, [complexity]);

  function ComplexityFilter() {
    return (
      <View style={{paddingLeft: 10}}>
        <Slider style={{width: 240, height: 10}}
          minimumValue={1}
          maximumValue={19}
          minimumTrackTintColor='gray'
          step={1}
          value={complexity}
          onSlidingComplete={(value) => handleComplexity(value)}
          />
          <Text>
            Ingredients:{complexity}
            </Text>
        </View>
    )
  }
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
          title={`Desserts`}
          checked={dessertsIsChecked}
          onPress={() => setDessertsIsChecked(!dessertsIsChecked)}
            />
          <CategoryFilter
            title={`Mains`}
            checked={mainsIsChecked}
            onPress={() => setMainsIsChecked(!mainsIsChecked)}
            />
          <CategoryFilter
            title={`Appetisers`}
            checked={appetisersIsChecked}
            onPress={() => setAppetisersIsChecked(!appetisersIsChecked)}
            />
          <Text style={[globalStyles.appBodyFont, {padding: 10, paddingTop: 20}]}>Complexity</Text>
          <ComplexityFilter />
        </Drawer>
    </DrawerContentScrollView>
  );
}

const DrawerNav = createDrawerNavigator();

function FilterDrawer() {
  return (
    <DrawerNav.Navigator
    screenOptions={{
      drawerType: 'front',
    }}
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerNav.Screen name="Dishes" component={DishesScreen} options={{
        headerTitleStyle: {
          ...globalStyles.appMainTitle,
          color: 'black',
        }
      }}/>
    </DrawerNav.Navigator>
  );
}

function DishesScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={[globalStyles.appBody]}>
          {
          }
          </View>
      <View style={[globalStyles.appBody, {
        justifyContent: 'flex-end'
        }]}>
        <FlatButton text = {'Reviews'} invert = {'n'} 
          onPress={() => {router.push('/review')}}
          />
        <FlatButton text = {'Back'} invert = {'n'} 
          onPress={() => router.replace('/')}
          />
        </View>
    </View>
  );
}

export default function Dishes() {
  const [dishes, setDishes] = useState([]);
  const dishesRef = collection(firestoredb, 'dishes')

  function Dish(props) {
    return (
      <Card style={[globalStyles.dishesCard]}>
          <Card.Title
            title={props.text}
          />
        </Card>
    )
  }
  const q = query(dishesRef, where("category", "==", "Desserts"));

  // getDocs(q)
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data().title);
  //     });
  //   })
  //   .catch((error) => {
  //     console.error("Error getting documents: ", error);
  //   });

  return (
    <SafeAreaProvider style={[globalStyles.container]}>
      <FilterDrawer />
    </SafeAreaProvider>
  );
}