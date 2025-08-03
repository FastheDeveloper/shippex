import { useMemo, useRef, useState } from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  AppNameLogo,
  BellIcon,
  FilterIcon,
  Profile,
  ScanIcon,
  SearchIcon,
} from '~/src/assets/svg/appicon';
import ShipmentList, { ShipmentItemType } from '~/src/components/Packages';
import BottomSheet, { BottomSheetBackgroundProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { APP_COLOR } from '~/src/constants/Colors';
import FilterSheet from '~/src/components/FilterSheet';
import shipmentData from '~/src/data/testdata.json';
import PlainInput from '~/src/components/PlainInput';
import Fuse from 'fuse.js';

const fuseOptions = {
  keys: [
    'origin.state',
    'destination.state',
    'origin.address',
    'destination.address',
    'trackingId',
    'status',
  ],
  threshold: 0.3,
};

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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);

  const filteredData = useMemo(() => {
    if (!shipmentData || shipmentData.length === 0) return [];

    // Apply filter by status
    let result =
      selectedFilters.length === 0
        ? shipmentData
        : shipmentData.filter((item) => selectedFilters.includes(item.status.toUpperCase()));

    // Apply fuzzy search
    if (searchQuery.trim()) {
      const fuse = new Fuse(result, fuseOptions);
      const fuseResult = fuse.search(searchQuery.trim());
      result = fuseResult.map(({ item }) => item);
    }

    return result;
  }, [searchQuery, selectedFilters, shipmentData]);
  const handleSheetChanges = (index: number) => {
    setIsSheetOpen(index >= 0);
  };

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
          <PlainInput
            placeholder="Search"
            leftAdornment={
              <SearchIcon
                width={24}
                height={23}
                style={{ paddingRight: 30 }}
                color={isSearching ? APP_COLOR.PRIMARY_BLUE : undefined}
              />
            }
            marginBottom={20}
            onChangeText={setSearchQuery}
            containerStyle="h-1 border-rounded"
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
          />
        </View>
        <View className="flex-row items-center justify-between py-4">
          <Pressable
            className={`bg-BOX_BG w-[47%] flex-row items-center justify-center gap-3 rounded-lg px-5 py-3`}
            onPress={() => {
              setIsSheetOpen(true);
              bottomSheetRef.current?.snapToIndex(0);
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

        <View className="mb-80">
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
              setSelectedFilters([]);
              setIsSheetOpen(false);
              bottomSheetRef.current?.close();
            }}
            onDone={(filters) => {
              setSelectedFilters(filters);
              bottomSheetRef.current?.close();
            }}
            onSelect={(filters) => {
              setSelectedFilters(filters);
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
    height: '100%',
  },
});
