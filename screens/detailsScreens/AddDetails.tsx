import { FlatList, Dimensions, View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useStore, } from '../../stateStores/DetailsStore';
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

const AddDetails = () => {

  const detailStore = useStore(state => state);
  const modalStore = useModalStore(state => state);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  // each user will have a category array in their database, this will be 
  // fetched when the user logs in, the structure will be as follows:
  // const categories = [
  // {
  //   id: '1',
  //   label: 'appliances',
  //   subcategories: [
  //     {
  //       id: '1',
  //       label: 'dishwashers',
  //       items: [
  //         { id: '1', label: 'whirlpool model name' },
 
  //these categories will be fetched from the database, each user starts with a 
  //standard set of categories, but can add more as needed
  //the categories will be displayed in a grid, with a maximum of 3 categories per row
  //the user can add a new category by clicking the plus button
  //when the user clicks on the category, it will bring up the next screen
  //with the items in that category
  // onpress of the item, it will bring up the next screen, the category will be stored
  // in the zustand store and a fetch/filter will be done for the subcategory
  // there will be three levels of categories, main, sub, and then item 
  // *** what should the dropdown do? ***
  const [categories, setCategories] = useState([
    {label: 'Appliances', value: 'appliances'},
    {label: 'Flooring', value: 'flooring'},
    {label: 'Lighting', value: 'lighting'},
    {label: 'Wall Treatment', value: 'wallTreatment'},
  ]);
  const categoriesTest: Category[] = [
    {
      id: '1',
      label: 'Appliances',
      subcategories: [
        {
          id: '1',
          label: 'Dishwashers',
          items: [
            { id: '1', label: 'Whirlpool Model X' },
            { id: '2', label: 'GE Model Y' },
            { id: '3', label: 'Bosch Model Z' },
          ],
        },
        {
          id: '2',
          label: 'Refrigerators',
          items: [
            { id: '4', label: 'Samsung Model A' },
            { id: '5', label: 'LG Model B' },
            { id: '6', label: 'Whirlpool Model C' },
          ],
        },
        // More subcategories...
      ],
    },
    {
      id: '2',
      label: 'Electronics',
      subcategories: [
        {
          id: '3',
          label: 'Televisions',
          items: [
            { id: '7', label: 'Sony Model D' },
            { id: '8', label: 'Samsung Model E' },
            { id: '9', label: 'LG Model F' },
          ],
        },
        // More subcategories...
      ],
    },
    {
      id: '3',
      label: 'Furniture',
      subcategories: [
        {
          id: '4',
          label: 'Beds',
          items: [
            { id: '10', label: 'Ikea Model G' },
            { id: '11', label: 'Home Depot Model H' },
            { id: '12', label: 'Wayfair Model I' },
          ],
        },
        // More subcategories...
      ],
    },
    {
      id: '4',
      label: 'Vehicles',
      subcategories: [
        {
          id: '5',
          label: 'Cars',
          items: [
            { id: '13', label: 'Honda Model J' },
            { id: '14', label: 'Toyota Model K' },
            { id: '15', label: 'BMW Model L' },
          ],
        },
        // More subcategories...
      ],
    },
    {
      id: '5',
      label: 'Books',
      subcategories: [
        {
          id: '6',
          label: 'Fiction',
          items: [
            { id: '16', label: 'To Kill a Mockingbird' },
            { id: '17', label: '1984' },
            { id: '18', label: 'Pride and Prejudice' },
          ],
        },
        // More subcategories...
      ],
    },
  ];
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

  // const CategoryBox = ({categoryName}:CategoryBoxProps) => {
  // return (
  //   <View style={styles.categoryBox}>
  //     <View style={styles.categoryPhoto}></View>
  //     <Text>{categoryName}</Text>
  //   </View>
  // )
  // }
  const CategoryBox: React.FC<CategoryBoxProps> = ({ item }:any) => {
    const navigate = useStore(state => state.navigate);
  
    return (
      <TouchableOpacity style={styles.categoryBox} onPress={() => navigate(item)}>
             <View style={styles.categoryPhoto}></View>

        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
  };

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

  const Grid: React.FC<GridProps> = ({ categories }) => {
    const { navLevel, selectedCategory, selectedSubcategory, goBack } = useStore(state => state);
  
    let dataToDisplay:any;
    if (navLevel === 'categories') {
      dataToDisplay = categories;
    } else if (navLevel === 'subcategories') {
      dataToDisplay = selectedCategory?.subcategories;
    } else {
      dataToDisplay = selectedSubcategory?.items;
    }
  
    return (
      <View style={styles.container}>

        {dataInChunks(dataToDisplay, 3).map((row, index:any) => (
          <View key={index} style={{ flexDirection: 'row' }}>
            {row.map((item:any) => (
              <CategoryBox key={item.id} item={item} />
            ))}
          </View>
        ))}
              {navLevel === 'categories' && <Button title="Add Item" onPress={() => modalStore.openCategoryModal()} />}
              {navLevel === 'items' && <Button title="Add Item" onPress={() => modalStore.openDetailsModal()} />}

      </View>
    );
  };

  const BackButton: React.FC = () => {
    const goBack = useStore((state) => state.goBack);
  
    return (
      <Button title="Go Back" onPress={() => goBack()} />
    );
  };

  const SelectedValues: React.FC = () => {
    const { selectedCategory, selectedSubcategory } = useStore(state => state);
  
    return (
      <View style={{flexDirection: "row"}}>
        <Text> {selectedCategory?.label || ""}</Text>
        <Text> {selectedSubcategory?.label || ""}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
        <AddCategoryModal visible={modalStore.isCategoryModalOpen} onClose={modalStore.closeCategoryModal}/>
        <AddDetailsModal visible={modalStore.isDetailsModalOpen} onClose={modalStore.closeDetailsModal}/>
     <View style={styles.upperContainer}>
        <View style={styles.upperContainerLeft}>
          <View style={styles.upperLeftPhoto}></View>
        </View>
        <View style={styles.upperContainerRight}>
        {/* <Button title="Add Item" onPress={() => modalStore.openCategoryModal()} /> */}
          <Text style={styles.upperContainerLargeText}>Details & Specifics</Text>
          <Text style={styles.upperContainerSmallText}>Add items that are part of the property. Do this when you have access to the either the  items, receipts, manuals, product details or labels and the like.</Text>
        </View>
      </View>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      <View style={styles.homeCategoriesContainer}>
        <Text style={styles.homeCategoriesText}>Home Categories <SelectedValues/></Text>
      </View>
      <View style={{width: 200, padding: 20, zIndex: 1000, flexDirection: 'row'}}>
      {/* <DropDownPicker
        open={open}
        value={value}
        items={categories}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setCategories}
      /> */}
<BackButton/>
      </View>
      <Grid categories={categoriesTest}/> 
      {/* {categories.map((category:any) => {
        return (
          <CategoryBox categoryName={category.label} />
        )
      })} */}
    </ScrollView>
  )
}

export default AddDetails

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
  }
})