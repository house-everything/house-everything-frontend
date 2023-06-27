import { StyleSheet, Text, View, Modal, Button, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox';


const screenHeight = Dimensions.get('window').height;

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

const AddCategoryModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  // const [categories, setCategories] = React.useState([
  //   {id:1,'Appliances',}
  //   'Mechanics',
  //   'Plumbing',
  // ]);
  const [isChecked, setChecked] = useState(false);

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
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.modalContainer}>
        <View style={{ backgroundColor: 'white', padding: 20, width: '100%', height: screenHeight * 0.9, zIndex: 2000, position: 'absolute', bottom: 0 }}>
          <View style={{flexDirection: "row", justifyContent: 'space-between',}}>
            <Text onPress={onClose}>X</Text>
            <Text onPress={onClose}>Done</Text>
          </View>
          <Button title="Close" onPress={onClose} />
          <Text>Add Additional Categories</Text>
          <FlatList
            data={categoriesTest}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
              // onPress={() => toggleCategoryInModal(item)}
              >
                {/* <Text style={{ textDecorationLine: selectedCategoriesInModal.some(c => c.id === item.id) ? 'underline' : 'none' }}>
                  {item.label}
                </Text> */}
                        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />

              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddCategoryModal

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    // zIndex: 1000,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal : {
    backgroundColor: 'white', 
    padding: 20, 
    width: '100%', 
    height: screenHeight * 0.9, 
    zIndex: 2000, 
    position: 'absolute', 
    bottom: 0 
  },
  checkbox: {
    margin: 8,
  },
})