import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ListRenderItem, Pressable } from 'react-native';
import shipmentData from '~/src/data/testdata.json';
import {
  BigLeftIcon,
  CallIcon,
  CheckedBox,
  LeftIcon,
  ParcelIcon,
  ResizeIcon,
  ResizeOpenIcon,
  UncheckedBox,
  WhatsappIcon,
} from '../assets/svg/appicon';
import { APP_COLOR, ShipmentStatus, statusBGColors, statusColors } from '../constants/Colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import DashedLine from './DottedLine';

interface Location {
  state: string;
  address: string;
}

export interface ShipmentItemType {
  id: number;
  status: ShipmentStatus;
  origin: Location;
  destination: Location;
  trackingId: string;
  selected: boolean;
  extended: boolean;
}

type ShipmentListProps = {
  data: ShipmentItemType[];
};

const ShipmentItem = ({
  item,
  selected,
  onToggle,
}: {
  item: ShipmentItemType;
  selected: boolean;
  onToggle: () => void;
}) => {
  // const  extended=true
  const [extended, setExtended] = useState(false);

  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-10);
  const MAX_HEIGHT = 160;
  useEffect(() => {
    if (extended) {
      height.value = withTiming(MAX_HEIGHT, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });
    } else {
      height.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(-10, { duration: 300 });
    }
  }, [extended]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
    overflow: 'hidden',
  }));

  return (
    <View className={`my-4 rounded-t-lg ${extended ? '' : ' rounded-b-lg'}`}>
      <View
        className={` bg-BOX_BG flex-row items-center  justify-between rounded-t-lg ${extended ? '' : ' rounded-b-lg'} p-4`}>
        <View className="mr-2 w-[24px] items-center">
          {selected ? (
            <CheckedBox width={17} height={16} onPress={onToggle} />
          ) : (
            <UncheckedBox width={17} height={16} onPress={onToggle} />
          )}
        </View>
        <View className="w-[40px] items-center">
          <ParcelIcon width={40} height={40} />
        </View>
        <View className="flex-1 px-3">
          <Text className="font-SF_REGULAR text-sm text-[#3F395C]">AWB</Text>
          <Text className="font-SF_SEMIBOLD text-lg text-black">{item.trackingId}</Text>
          <View className="flex-row items-center  gap-2">
            <Text className="text-REGULAR_TEXT font-SF_REGULAR text-sm ">{item.origin.state}</Text>
            <LeftIcon width={8} height={8} />
            <Text className="text-REGULAR_TEXT font-SF_REGULAR text-sm ">
              {item.destination.state}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-4 ">
          <Text
            style={[
              {
                color: statusColors[item.status],
                backgroundColor: statusBGColors[item.status],
                paddingHorizontal: 6,
                paddingVertical: 5,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 6,
              },
            ]}
            className="font-SF_MEDIUM">
            {item.status}
          </Text>
          {extended ? (
            <ResizeOpenIcon width={24} height={24} onPress={() => setExtended(false)} />
          ) : (
            <ResizeIcon width={24} height={24} onPress={() => setExtended(true)} />
          )}
        </View>
      </View>

      <Animated.View style={[animatedStyle]}>
        {extended && (
          <>
            <View className="overflow-hidden rounded-b-lg bg-[#F4F2F880]">
              <DashedLine
                lineColor="white"
                height={3}
                dashWidth={12}
                dashGap={4}
                style={{ width: '100%' }}
              />

              <View className="p-4">
                <View className="flex-row items-center justify-between ">
                  <View className="w-[33%]">
                    <Text className=" font-SF_REGULAR text-PRIMARY_BLUE text-sm">Origin</Text>
                    <Text className="font-SF_MEDIUM text-base text-black">{item.origin.state}</Text>

                    <Text className=" text-DARK_TEXT font-SF_REGULAR text-base">
                      {item.origin.address}
                    </Text>
                  </View>
                  <View className="">
                    <BigLeftIcon width={24} height={24} />
                  </View>
                  <View className="w-[35%] ">
                    <Text className=" font-SF_REGULAR text-PRIMARY_BLUE text-sm">Destination</Text>
                    <Text className="font-SF_MEDIUM text-base text-black">{item.origin.state}</Text>

                    <Text className=" text-DARK_TEXT font-SF_REGULAR text-base">
                      {item.destination.address}
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center justify-end gap-4 pb-3 pt-5">
                  <CallIcon width={100} height={40} />
                  <WhatsappIcon width={142} height={40} />
                </View>
              </View>
            </View>
          </>
        )}
      </Animated.View>
    </View>
  );
};

const ShipmentList = ({ data }: ShipmentListProps) => {
  const [markedAll, setMarkedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMarkAll = () => {
    const newMarkedAll = !markedAll;
    const newSelection: Record<string, boolean> = {};
    for (const item of shipmentData) {
      newSelection[item.trackingId] = newMarkedAll;
    }
    setMarkedAll(newMarkedAll);
    setSelectedItems(newSelection);
  };

  const renderItem: ListRenderItem<ShipmentItemType> = ({ item }) => (
    <ShipmentItem
      item={item}
      selected={!!selectedItems[item.trackingId]}
      onToggle={() => handleToggle(item.trackingId)}
    />
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.trackingId}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 320 }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View className="flex-row items-center justify-between py-4">
          <Text className="font-SF_SEMIBOLD text-2xl text-black">Shipments</Text>
          <Pressable className="flex-row items-center gap-2" onPress={handleMarkAll}>
            {markedAll ? (
              <CheckedBox width={17} height={16} />
            ) : (
              <UncheckedBox width={17} height={16} />
            )}

            <Text className="text-PRIMARY_BLUE font-SF_REGULAR text-lg">Mark All</Text>
          </Pressable>
        </View>
      }
    />
  );
};

export default ShipmentList;
