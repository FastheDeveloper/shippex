import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { APP_COLOR } from '../constants/Colors';

type FilterSheetProps = {
  onClose: () => void;
  onDone: (filter: string) => void;
  onSelect: (filter: string) => void;
};

const FILTERS = ['RECEIVED', 'PUT AWAY', 'Delivered', 'Canceled', 'Rejected', 'Lost', 'On Hold'];

const FilterSheet = ({ onClose, onDone, onSelect }: FilterSheetProps) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const handleFilterPress = (filter: string) => {
    const newFilter = selectedFilter === filter ? '' : filter;
    setSelectedFilter(newFilter);
    onSelect(newFilter);
  };

  const handleDone = () => {
    onDone(selectedFilter);
    // onClose();
  };

  const handleCancel = () => {
    setSelectedFilter('');
    onDone('');
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
                selectedFilter === 'RECEIVED' ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('RECEIVED')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilter === 'RECEIVED' ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
                }`}>
                Received
              </Text>
            </Pressable>

            <Pressable
              className={`bg-BOX_BG w-[27%] flex-row items-center justify-center gap-3 rounded-xl px-1 py-2  ${
                selectedFilter === 'PUT AWAY' ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('PUT AWAY')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilter === 'PUT AWAY' ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
                }`}>
                Putaway
              </Text>
            </Pressable>

            <Pressable
              className={`bg-BOX_BG w-[27%] flex-row items-center justify-center gap-3 rounded-xl px-1 py-2  ${
                selectedFilter === 'Delivered' ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('Delivered')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilter === 'Delivered' ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
                }`}>
                Delivered
              </Text>
            </Pressable>
          </View>

          <View className="flex-row  gap-4">
            <Pressable
              className={`bg-BOX_BG w-[27%] flex-row items-center justify-center gap-3 rounded-xl px-1 py-2  ${
                selectedFilter === 'Canceled' ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('Canceled')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilter === 'Canceled' ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
                }`}>
                Canceled
              </Text>
            </Pressable>

            <Pressable
              className={`bg-BOX_BG w-[27%] flex-row items-center justify-center gap-3 rounded-xl px-1 py-2  ${
                selectedFilter === 'Rejected' ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('Rejected')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilter === 'Rejected' ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
                }`}>
                Rejected
              </Text>
            </Pressable>

            <Pressable
              className={`bg-BOX_BG w-[22%] flex-row items-center justify-center gap-3 rounded-xl px-1 py-2  ${
                selectedFilter === 'Lost' ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('Lost')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilter === 'Lost' ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
                }`}>
                Lost
              </Text>
            </Pressable>
          </View>

          <View className="flex-row  gap-4">
            <Pressable
              className={`bg-BOX_BG w-[22%] flex-row items-center justify-center gap-3 rounded-xl px-1 py-2  ${
                selectedFilter === 'On Hold' ? 'border-PRIMARY_BLUE border' : ''
              }`}
              onPress={() => handleFilterPress('On Hold')}>
              <Text
                className={`font-SF_REGULAR text-base ${
                  selectedFilter === 'On Hold' ? 'text-PRIMARY_BLUE' : 'text-DARK_TEXT'
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
