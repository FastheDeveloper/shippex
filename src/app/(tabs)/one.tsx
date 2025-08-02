import { Stack } from 'expo-router';
import { useState } from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  AppNameLogo,
  BellIcon,
  CheckedBox,
  FilterIcon,
  Profile,
  ScanIcon,
  SearchIcon,
  UncheckedBox,
} from '~/src/assets/svg/appicon';
import AnimatedInput from '~/src/components/AnimatedInput';

import { ScreenContent } from '~/src/components/ScreenContent';

export default function Home() {
  const [markedAll, setMarkedAll] = useState(false);
  return (
    <View className="flex-1 bg-white px-4">
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
          className={`bg-BOX_BG w-[47%] flex-row items-center justify-center gap-3 rounded-lg px-5 py-3`}>
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
        <View className="flex-row items-center justify-between py-4">
          <Text className="font-SF_SEMIBOLD text-2xl text-black">Shipments</Text>
          <Pressable
            className="flex-row items-center gap-2"
            onPress={() => setMarkedAll(!markedAll)}>
            {markedAll ? (
              <CheckedBox width={17} height={16} />
            ) : (
              <UncheckedBox width={17} height={16} />
            )}

            <Text className="text-PRIMARY_BLUE font-SF_REGULAR text-lg">Mark All</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
