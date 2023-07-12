import { FlatList, Dimensions, View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useFloorsAndRoomsStore, } from '../../stateStores/ByRoomsAndFloorsStore';
import { useModalStore } from '../../stateStores/ModalStore';
import AddCategoryModal from '../../components/AddCategoryModal';
import AddDetailsModal from '../../components/AddDetailsModal';
import { FontAwesome } from '@expo/vector-icons';


interface CategoryBoxProps {
  item: Category | Subcategory | Item;
}
interface Item {
  id: string;
  label: string;
}

interface Subcategory extends Item {
  items: Item[];
}

export interface Category extends Item {
  subcategories: Subcategory[];
}

const { width } = Dimensions.get('window');
const itemSize = width / 3;

const ByRoomsAndFloors = () => {

  const Store = useFloorsAndRoomsStore(state => state);
  const modalStore = useModalStore(state => state);

  const floors = Store.floors;

  /// room structure in DB should be like this:
  const rooms = Store.rooms;


  const categories = [
   'appliances',
   'mechanicals',
   'interior',
   'exterior',
   'septic & waste' 
  ]

  const objects = [
    {name: 'Refrigerator', category: 'appliances', },
    {name: 'Stove', category: 'appliances', },
    {name: 'Dishwasher', category: 'appliances', },
    {name: 'Washer', category: 'appliances', },
    {name: 'Dryer', category: 'appliances', },
    {name: 'Microwave', category: 'appliances', },
    {name: 'Freezer', category: 'appliances', },
    {name: 'Oven', category: 'appliances', },
    {name: 'Water Heater', category: 'mechanicals', },
    {name: 'Furnace', category: 'mechanicals', },
    {name: 'Air Conditioner', category: 'mechanicals', },
    {name: 'Water Softener', category: 'mechanicals', },
    {name: 'Water Pump', category: 'mechanicals', },
    {name: 'Water Filter', category: 'mechanicals', },
    {name: 'Water Tank', category: 'mechanicals', },

  ]
 


  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [selectCategory, setSelectCategory] = useState('');

  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [objectType, setObjectType] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const filterProps = {
    floor: selectedFloor,
    room: selectedRoom,
    category: selectCategory,
    objectType: objectType
  };


  useEffect(() => {
    if (Store.area !== '') {
      setFilteredRooms(rooms.filter((room: any) => room.floor === Store.area));
    } else {
      setFilteredRooms(rooms);
    }
  }, [Store.area]);

  function dataInChunks<T>(data: T[], chunkSize: number): T[][] {
    let chunks: T[][] = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }
    return chunks;
  }
  

  /// function that will take in a room and then set the room and floor in the filter props
  const setRoomAndFloor = (roomName: string) => {
    const roomData = rooms.find((room: any) => room.name === roomName);
    if (roomData) {
      setSelectedRoom(roomData.name);
      setSelectedFloor(roomData.floor);
    }
  };
  const RoomGridBox: React.FC<CategoryBoxProps> = ({ item }:any) => {
    // const navigate = useStore(state => state.navigate);
  
    return (
      <TouchableOpacity style={styles.categoryBox} 
      onPress={() => setRoomAndFloor(item)}
      >
             <View style={styles.categoryPhoto}>
             <FontAwesome name="photo" size={24} color="black" />
             </View>
  
        <Text style={styles.categoryBoxText}>{item}</Text>
        <Text style={styles.categoryBoxTextSmall}>add details </Text>
      </TouchableOpacity>
    );
  };
  const FloorGridBox: React.FC<CategoryBoxProps> = ({ item }:any) => {
    // const navigate = useStore(state => state.navigate);
  
    return (
      <TouchableOpacity style={styles.categoryBox} 
      onPress={() => setSelectedFloor(item)}
      >
             <View style={styles.categoryPhoto}>
             <FontAwesome name="photo" size={24} color="black" />
             </View>
  
        <Text style={styles.categoryBoxText}>{item}</Text>
        <Text style={styles.categoryBoxTextSmall}>add details </Text>
      </TouchableOpacity>
    );
  };

  const CategoryBox: React.FC<CategoryBoxProps> = ({ item }:any) => {
    // const navigate = useStore(state => state.navigate);
  
    return (
      <TouchableOpacity style={styles.categoryBox} 
      onPress={() => setSelectCategory(item)}
      >
             <View style={styles.categoryPhoto}>
              <FontAwesome name="photo" size={24} color="black" />
             </View>
  
        <Text style={styles.categoryBoxText}>{item}</Text>
        <Text style={styles.categoryBoxTextSmall}>add details </Text>
      </TouchableOpacity>
    );
  };


  const ObjectBox: React.FC<CategoryBoxProps> = ({ item }:any) => {
    // const navigate = useStore(state => state.navigate);
  
    return (
      <TouchableOpacity style={styles.categoryBox} 
      onPress={() => {setObjectType(item); toggleModal()}}
      >
             <View style={styles.categoryPhoto}>
              <FontAwesome name="photo" size={24} color="black" />
             </View>
  
        <Text style={styles.categoryBoxText}>{item}</Text>
        <Text style={styles.categoryBoxTextSmall}>add details </Text>
      </TouchableOpacity>
    );
  };


  
  interface GridProps {
    categories: string[];
    BoxComponent: React.FC<CategoryBoxProps>;
  }
  
  const Grid: React.FC<GridProps> = ({ categories, BoxComponent }) => {
  
  
    return (
      <View style={styles.container}>
  
        {dataInChunks(categories, 3).map((row, index:any) => (
          <View key={index} style={{ flexDirection: 'row', marginBottom: 15, marginTop: 15 }}>
            {row.map((item:any) => (
              
              <BoxComponent key={index} item={item} />
             
              
            ))}
          </View>
        ))}
  
      </View>
    );
  };

  

  return (
    <ScrollView style={styles.container}>

<AddDetailsModal visible={modalVisible} onClose={toggleModal} filterProps={filterProps}/>
   
 <View style={styles.upperContainer}>
    <View style={styles.upperContainerLeft}>
      <View style={styles.upperLeftPhoto}></View>
    </View>
    <View style={styles.upperContainerRight}>
    {/* <Button title="Add Item" onPress={() => modalStore.openCategoryModal()} /> */}
      <Text style={styles.upperContainerLargeText}>Rooms & Floors{selectedFloor}{selectedRoom}</Text>
      <Text style={styles.upperContainerSmallText}>Add items that are part of the property. Do this when you have access to the either the  items, receipts, manuals, product details or labels and the like.</Text>
    </View>
  </View>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  <View style={styles.homeCategoriesContainer}>
    <Text style={styles.homeCategoriesText}>Select Rooms {Store.area} {selectCategory}</Text>
  </View>  
  <Button title="Clear Filters" onPress={() => {setSelectedFloor(''); setSelectedRoom(''); setSelectCategory('');}} />
  
  {selectedFloor == '' 
  ?  
 <>
  <Grid categories={rooms.map(i => i.name)} BoxComponent={RoomGridBox} />
  <View style={styles.homeCategoriesContainer}>
    <Text style={styles.homeCategoriesText}>Select Floors{Store.area}</Text>
  </View> 
  <Grid categories={floors} BoxComponent={FloorGridBox}/>
 </>
  :
  <>
  {selectCategory == ''?
   <Grid categories={categories} BoxComponent={CategoryBox}/> 
   : 
   <Grid BoxComponent={ObjectBox} categories={objects.filter(object => object.category === selectCategory).map(object => object.name)} />}
  </>
  }

{/* {Store.location === '' &&  <Grid categories={locations} />}
{Store.location === 'interior' &&  <Grid categories={interiorItems} />}
{Store.location === 'exterior' &&  <Grid categories={locations} />}
{Store.location === 'rooms' &&  <Grid categories={locations} />}
{Store.location === 'floors' &&  <Grid categories={locations} />} */}

</ScrollView>
  )
}

export default ByRoomsAndFloors

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: 'white',
  },
  upperContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  upperContainerLeft: {
    flex: 1,
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',

  },
  upperContainerRight: {
    flex: 2,
    width: 100,
    height: 120,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20
   
  },
  upperLeftPhoto: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'blue',
  },
  upperContainerSmallText: {
    fontSize: 12,
  },
  upperContainerLargeText: {
    fontSize: 20,
  },

  homeCategoriesContainer: {
    height: 25,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    marginVertical: 20,
    // alignItems: 'center',
    
  },
  homeCategoriesText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 20,
  },
  categoryBox: {
    flex: 1,
    margin: 2,
    // backgroundColor: 'lightblue', // Just for visibility, adjust as needed
    // justifyContent: 'center',
    alignItems: 'center',
    height: itemSize,
    maxWidth: itemSize,
  },
  categoryPhoto: { 
    width: 100,
    height: 100,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // padding: 20,
    backgroundColor: 'grey',
  },
  item: {
    width: itemSize ,
    height: itemSize ,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  categoryBoxText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryBoxTextSmall: {
    fontSize: 12,
  },
})