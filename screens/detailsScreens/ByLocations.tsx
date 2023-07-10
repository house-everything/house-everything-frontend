import { FlatList, Dimensions, View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useStore, } from '../../stateStores/ByLocationsStore';
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

const ByLocations = () => {

//locations array. this will be potentially replaced by a call to the database
// where locations and custom locations will be stored

const locations: string[] = [
  'interior',
  'exterior',
  'floors',
  'rooms',
]
//list of interior items/materials, this will maybe come from the database
const interiorItems: string[] = [

'Paints',
'Tiles',
'Flooring',
'Lighting',
// 'Lightbulbs',
// 'Hardware',
// 'Grout',
// 'Switches & Dimmers',
// 'A/V',
// 'Doors',
// 'Wallpaper',
// 'Cabinets',
// 'Windows',
// 'Window Treatments',
// 'Pellet Stove',
// 'Wood fired Stove',
// 'Fireplace',
// 'Security System',
// 'Pool',
// 'Hot Tub',
// 'Bath Tub',
// 'Shower'
]
const Store = useStore(state => state);
const modalStore = useModalStore(state => state);

interface GridProps {
  categories: Category[];
}

function dataInChunks<T>(data: T[], chunkSize: number): T[][] {
  let chunks: T[][] = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }
  return chunks;
}


const CategoryBox: React.FC<CategoryBoxProps> = ({ item }:any) => {
  // const navigate = useStore(state => state.navigate);

  return (
    <TouchableOpacity style={styles.categoryBox} 
    onPress={() => Store.setLocation(item)}
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
            
            <CategoryBox key={index} item={item} />
           
            
          ))}
        </View>
      ))}
            {/* {navLevel === 'categories' && <Button title="Add Item" onPress={() => modalStore.openCategoryModal()} />}
            {navLevel === 'items' && <Button title="Add Item" onPress={() => modalStore.openDetailsModal()} />} */}

    </View>
  );
};



const renderItem = ({ item }: { item: string }) => (
  <TouchableOpacity style={styles.item} onPress={() => console.log(item)}>
    <Text>{item}</Text>
  </TouchableOpacity>
);

const Item = ({ location }: { location: string }) => (
  <TouchableOpacity style={styles.item}>
    <Text>{location}</Text>
  </TouchableOpacity>
);
  return (
    <ScrollView style={styles.container}>
    {/* <AddCategoryModal visible={modalStore.isCategoryModalOpen} onClose={modalStore.closeCategoryModal}/>
    <AddDetailsModal visible={modalStore.isDetailsModalOpen} onClose={modalStore.closeDetailsModal}/> */}
 <View style={styles.upperContainer}>
    <View style={styles.upperContainerLeft}>
      <View style={styles.upperLeftPhoto}></View>
    </View>
    <View style={styles.upperContainerRight}>
    {/* <Button title="Add Item" onPress={() => modalStore.openCategoryModal()} /> */}
      <Text style={styles.upperContainerLargeText}>Location </Text>
      <Text style={styles.upperContainerSmallText}>Add items that are part of the property. Do this when you have access to the either the  items, receipts, manuals, product details or labels and the like.</Text>
    </View>
  </View>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  <View style={styles.homeCategoriesContainer}>
    <Text style={styles.homeCategoriesText}>Select Location {Store.location}</Text>
  </View>  
  <Button title="Clear Filters" onPress={() => Store.setLocation('')} />

  <View style={{width: 200, padding: 20, zIndex: 1000, flexDirection: 'row'}}>

  {/* <DropDownPicker
    open={open}
    value={value}
    items={categories}
    setOpen={setOpen}
    setValue={setValue}
    setItems={setCategories}
  /> */}
{/* <BackButton/> */}
  </View>
{Store.location === '' &&  <Grid categories={locations} />}
{Store.location === 'interior' &&  <Grid categories={interiorItems} />}
{Store.location === 'exterior' &&  <Grid categories={locations} />}
{Store.location === 'rooms' &&  <Grid categories={locations} />}
{Store.location === 'floors' &&  <Grid categories={locations} />}

</ScrollView>
  )
}

export default ByLocations

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
    justifyContent: 'center',
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
    width: itemSize -15,
    height: itemSize ,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  categoryBoxText: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryBoxTextSmall: {
    fontSize: 12,
  },
})