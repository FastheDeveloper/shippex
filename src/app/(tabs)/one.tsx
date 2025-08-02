import { Stack } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';

import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  AppNameLogo,
  BackIcon,
  BellIcon,
  CheckedBox,
  FilterIcon,
  Profile,
  ScanIcon,
  SearchIcon,
  UncheckedBox,
} from '~/src/assets/svg/appicon';
import AnimatedInput from '~/src/components/AnimatedInput';
import ShipmentList, { ShipmentItemType } from '~/src/components/Packages';
import BottomSheet, { BottomSheetBackgroundProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { APP_COLOR } from '~/src/constants/Colors';
import FilterSheet from '~/src/components/FilterSheet';
import shipmentData from '~/src/data/testdata.json';

export const CustomOverlayBackground = (props: BottomSheetBackgroundProps) => {
  const { style } = props;

  return (
    <View
      // pointerEvents="none"
      style={[
        style,
        {
          backgroundColor: 'rgba(0,0,0,0.4)',
        },
      ]}
    />
  );
};

export default function Home() {
  const [markedAll, setMarkedAll] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const filteredData = useMemo(() => {
    if (!selectedFilter) return shipmentData;

    const normalizedFilter = selectedFilter.toUpperCase(); // 'Putaway' => 'PUTAWAY'
    return shipmentData.filter((item) => item.status === normalizedFilter);
  }, [selectedFilter]);

  const handleSheetChanges = (index: number) => {
    setIsSheetOpen(index >= 0);
  };
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <View className="flex-1 bg-white px-4">
      <View>
        <View className="flex-row items-center justify-between">
          <Profile width={40} height={40} />
          <AppNameLogo width={92} height={16} />
          <BellIcon width={40} height={40} />
        </View>
        <View className="mt-8">
          <Text className="font-SF_REGULAR text-DARK_TEXT text-BASE ">Hello,</Text>
          <Text className="font-SF_SEMIBOLD py-2 text-3xl text-black">Ibrahim Shaker</Text>
        </View>
        <View className="pb-14 pt-4">
          <AnimatedInput
            placeholder="Search"
            leftAdornment={<SearchIcon width={24} height={24} style={{ paddingRight: 30 }} />}
            marginBottom={20}
            containerStyle="h-1 border-rounded"
          />
        </View>
        <View className="flex-row items-center justify-between py-4">
          <Pressable
            className={`bg-BOX_BG w-[47%] flex-row items-center justify-center gap-3 rounded-lg px-5 py-3`}
            onPress={() => {
              setIsSheetOpen(true);
              bottomSheetRef.current?.snapToIndex(0); // 0 is the first snapPoint, which is 200
            }}>
            <FilterIcon width={24} height={24} />
            <Text className="font-SF_REGULAR text-DARK_TEXT text-xl">Filters</Text>
          </Pressable>
          <Pressable
            className={`bg-PRIMARY_BLUE w-[47%] flex-row items-center justify-center gap-3 rounded-lg px-5 py-3`}>
            <ScanIcon width={24} height={24} />
            <Text className="font-SF_REGULAR text-xl text-white">Add Scan</Text>
          </Pressable>
        </View>

        <View>
          <ShipmentList data={filteredData as ShipmentItemType[]} />
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={isSheetOpen ? CustomOverlayBackground : undefined}
        index={-1}
        enablePanDownToClose
        onChange={handleSheetChanges}
        snapPoints={['35%']}
        containerStyle={{ flex: 1 }}
        handleIndicatorStyle={{ backgroundColor: APP_COLOR.PLACEHOLDER_TEXT }}>
        <BottomSheetView style={styles.contentContainer}>
          <FilterSheet
            onClose={() => {
              setSelectedFilter('');
              setIsSheetOpen(false);

              bottomSheetRef.current?.close();
            }}
            onDone={(filter) => {
              setSelectedFilter(filter);
              bottomSheetRef.current?.close();
            }}
            onSelect={(filter) => {
              setSelectedFilter(filter);
            }}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
    // paddingHorizontal: 10,

    height: '100%',
  },
});
