import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { APP_COLOR } from '../constants/Colors';

type FilterSheetProps = {
  onClose: () => void;
  onDone: (filters: string[]) => void;
  onSelect: (filters: string[]) => void;
};

const FilterSheet = ({ onClose, onDone, onSelect }: FilterSheetProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterPress = (filter: string) => {
    const alreadySelected = selectedFilters.includes(filter);
    const updatedFilters = alreadySelected
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];

    setSelectedFilters(updatedFilters);
    onSelect(updatedFilters); // Now sending an array
  };
  const handleDone = () => {
    onDone(selectedFilters);
  };

  const handleCancel = () => {
    setSelectedFilters([]);
    onDone([]);
    onClose();
  };

  return (
    <View>
      <Pressable className="flex-row justify-between gap-2 px-4">
        <Text className="font-SF_MEDIUM text-PRIMARY_BLUE text-lg" onPress={handleCancel}>
          Cancel
        </Text>
        <Text className="font-SF_SEMIBOLD text-lg text-black">Filters</Text>
        <Text className="font-SF_MEDIUM text-PRIMARY_BLUE text-lg" onPress={handleDone}>
          Done
        </Text>
      </Pressable>

      <View
        style={{
          backgroundColor: APP_COLOR.BOX_BG,
          height: 1.9,
          marginVertical: 8,
        }}
      />

      <View className="px-4">
        <Text className="font-SF_MEDIUM text-DARK_TEXT text-sm">SHIPMENT STATUS</Text>
        <View className="gap-2 pt-5">
          <View className="flex-row  gap-4">
            <Pressable
              className={`bg-BOX_BG w-[27%] flex-row items-center justify-center gap-3 rounded-xl px-1 py-2  ${
                selectedFilters.includes('RECEIVED') ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('RECEIVED')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilters.includes('RECEIVED') ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
                }`}>
                Received
              </Text>
            </Pressable>

            <Pressable
              className={`bg-BOX_BG w-[27%] flex-row items-center justify-center gap-3 rounded-xl px-1 py-2  ${
                selectedFilters.includes('PUT AWAY') ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('PUT AWAY')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilters.includes('PUT AWAY') ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
                }`}>
                Putaway
              </Text>
            </Pressable>

            <Pressable
              className={`bg-BOX_BG w-[27%] flex-row items-center justify-center gap-3 rounded-xl px-1 py-2  ${
                selectedFilters.includes('DELIVERED') ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('DELIVERED')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilters.includes('DELIVERED') ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
                }`}>
                Delivered
              </Text>
            </Pressable>
          </View>

          <View className="flex-row  gap-4">
            <Pressable
              className={`bg-BOX_BG w-[27%] flex-row items-center justify-center gap-3 rounded-xl px-1 py-2  ${
                selectedFilters.includes('CANCELED') ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('CANCELED')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilters.includes('CANCELED') ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
                }`}>
                Canceled
              </Text>
            </Pressable>

            <Pressable
              className={`bg-BOX_BG w-[27%] flex-row items-center justify-center gap-3 rounded-xl px-1 py-2  ${
                selectedFilters.includes('REJECTED') ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('REJECTED')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilters.includes('REJECTED') ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
                }`}>
                Rejected
              </Text>
            </Pressable>

            <Pressable
              className={`bg-BOX_BG w-[22%] flex-row items-center justify-center gap-3 rounded-xl px-1 py-2  ${
                selectedFilters.includes('LOST') ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('LOST')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilters.includes('LOST') ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
                }`}>
                Lost
              </Text>
            </Pressable>
          </View>

          <View className="flex-row  gap-4">
            <Pressable
              className={`bg-BOX_BG w-[22%] flex-row items-center justify-center gap-3 rounded-xl px-1 py-2  ${
                selectedFilters.includes('ON HOLD') ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('ON HOLD')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilters.includes('ON HOLD') ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
                }`}>
                On Hold
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FilterSheet;

const styles = StyleSheet.create({});
