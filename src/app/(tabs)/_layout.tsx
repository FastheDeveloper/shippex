import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { ProfileTab, ScanIcon, ScanTab, ShipTab, WalletTab } from '~/src/assets/svg/appicon';
import { APP_COLOR } from '~/src/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: APP_COLOR.PRIMARY_BLUE,
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingTop: 10,
        },
      }}>
      <Tabs.Screen
        name="one"
        options={{
          title: 'Shipments',
          tabBarIcon: ({ color }) => <ShipTab width={24} height={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => <ScanTab width={31} height={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <WalletTab width={30} height={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <ProfileTab width={30} height={25} color={color} />,
        }}
      />
    </Tabs>
  );
}
