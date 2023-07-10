import { FlatList, Dimensions, View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useStore, } from '../../stateStores/ByRoomsAndFloorsStore';
import { useModalStore } from '../../stateStores/ModalStore';
import AddCategoryModal from '../../components/AddCategoryModal';
import AddDetailsModal from '../../components/AddDetailsModal';

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


  const floors: string[] = [
  'Basement',
  'First Floor',
  'Second Floor',
  'Attic',
  ]

  /// room structure in DB should be like this:
  const rooms = [
  {name: 'Bathroom', floor: 'First Floor'},
  {name: 'Primary Bedroom', floor: 'First Floor'},
  {name: 'Kitchen', floor: 'First Floor'},
  {name: 'Kids Bedroom', floor: 'Second Floor'},
  {name: 'Guest Bedroom', floor: 'Second Floor'},
  {name: 'Bathroom', floor: 'Second Floor'},
  {name: 'Workshop', floor: 'Basement'},
  {name: 'Laundry Room', floor: 'Basement'},
  {name: 'Storage Room', floor: 'Basement'},
  {name: 'Storage Room', floor: 'Attic'},
  ]


  const categories = [
   'Appliances',
   'Mechanicals',
   'Interior',
   'Exterior',
   'Septic & Waste' 
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
  const Store = useStore(state => state);
  const modalStore = useModalStore(state => state);


  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [selectCategory, setSelectCategory] = useState('');
  
  const filterProps = {
    floor: "First Floor",
    room: "Living Room",
    category: "Furniture",
    subcategory: "Tables",
  };


  useEffect(() => {
    if (Store.area !== '') {
      setFilteredRooms(rooms.filter((room) => room.floor === Store.area));
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
  
  
  const GridBox: React.FC<CategoryBoxProps> = ({ item }:any) => {
    // const navigate = useStore(state => state.navigate);
  
    return (
      <TouchableOpacity style={styles.categoryBox} 
      onPress={() => Store.setArea(item)}
      >
             <View style={styles.categoryPhoto}></View>
  
        <Text style={styles.categoryBoxText}>{item}</Text>
        <Text style={styles.categoryBoxTextSmall}>add details </Text>
      </TouchableOpacity>
    );
  };
  
  
  const Grid: React.FC<any> = ({ categories }) => {
  
  
    return (
      <View style={styles.container}>
  
        {dataInChunks(categories, 3).map((row, index:any) => (
          <View key={index} style={{ flexDirection: 'row', marginBottom: 15, marginTop: 15 }}>
            {row.map((item:any) => (
              
              <GridBox key={index} item={item} />
             
              
            ))}
          </View>
        ))}
              {/* {navLevel === 'categories' && <Button title="Add Item" onPress={() => modalStore.openCategoryModal()} />}
              {navLevel === 'items' && <Button title="Add Item" onPress={() => modalStore.openDetailsModal()} />} */}
  
      </View>
    );
  };

  const CategoryBox: React.FC<CategoryBoxProps> = ({ item }:any) => {
    // const navigate = useStore(state => state.navigate);
  
    return (
      <TouchableOpacity style={styles.categoryBox} 
      onPress={() => setSelectCategory(item)}
      >
             <View style={styles.categoryPhoto}></View>
  
        <Text style={styles.categoryBoxText}>{item}</Text>
        <Text style={styles.categoryBoxTextSmall}>add details </Text>
      </TouchableOpacity>
    );
  };

  const CategoryGrid: React.FC<any> = ({ categories }) => {
  
  
    return (
      <View style={styles.container}>
  
        {dataInChunks(categories, 3).map((row, index:any) => (
          <View key={index} style={{ flexDirection: 'row', marginBottom: 15, marginTop: 15 }}>
            {row.map((item:any) => (
              
              <CategoryBox key={index} item={item} />
             
              
            ))}
          </View>
        ))}
      
  
      </View>
    );
  };
  const ObjectBox: React.FC<CategoryBoxProps> = ({ item }:any) => {
    // const navigate = useStore(state => state.navigate);
  
    return (
      <TouchableOpacity style={styles.categoryBox} 
      onPress={() => modalStore.openDetailsModal()}
      >
             <View style={styles.categoryPhoto}></View>
  
        <Text style={styles.categoryBoxText}>{item}</Text>
        <Text style={styles.categoryBoxTextSmall}>add details </Text>
      </TouchableOpacity>
    );
  };

  const ObjectGrid: React.FC<any> = ({ categories }) => {
  
  
    return (
      <View style={styles.container}>
  
        {dataInChunks(categories, 3).map((row, index:any) => (
          <View key={index} style={{ flexDirection: 'row', marginBottom: 15, marginTop: 15 }}>
            {row.map((item:any) => (
              
              <ObjectBox key={index} item={item} />
             
              
            ))}
          </View>
        ))}
      
  
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>

<AddDetailsModal visible={modalStore.isDetailsModalOpen} onClose={modalStore.closeDetailsModal} filterProps={filterProps}/>
   
 <View style={styles.upperContainer}>
    <View style={styles.upperContainerLeft}>
      <View style={styles.upperLeftPhoto}></View>
    </View>
    <View style={styles.upperContainerRight}>
    {/* <Button title="Add Item" onPress={() => modalStore.openCategoryModal()} /> */}
      <Text style={styles.upperContainerLargeText}>Rooms & Floors</Text>
      <Text style={styles.upperContainerSmallText}>Add items that are part of the property. Do this when you have access to the either the  items, receipts, manuals, product details or labels and the like.</Text>
    </View>
  </View>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  <View style={styles.homeCategoriesContainer}>
    <Text style={styles.homeCategoriesText}>Select Rooms {Store.area} {selectCategory}</Text>
  </View>  
  <Button title="Clear Filters" onPress={() => {Store.setArea(''); setSelectCategory('');}} />
  
  {Store.area === '' 
  ?  
 <>
  <Grid categories={rooms.map(i => i.name)} />
  <View style={styles.homeCategoriesContainer}>
    <Text style={styles.homeCategoriesText}>Select Floors{Store.area}</Text>
  </View> 
  <Grid categories={floors} />
 </>
  :
  <>
  {selectCategory == ''? <CategoryGrid categories={categories}  /> : <ObjectGrid categories={objects.map(i => i.name)} />}
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
    backgroundColor: 'blue',
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