import { Tabs } from 'expo-router';
import { React } from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#0a7ea4',
            tabBarInactiveTintColor: '#0a7ea4',
            headerShown: false,
            tabBarStyle: Platform.select({
                ios: {
                    position: 'absolute',
                },
                default: {},
            }),
        }}>
            <Tabs.Screen 
                name="index"
                options={{
                    title: 'About'
                }}
            />
            <Tabs.Screen 
                name="goal"
                options={{
                    title: 'Goals'
                }}
            />
            <Tabs.Screen 
                name="reward"
                options={{
                    title: 'Rewards'
                }}
            />
          
        </Tabs>
    )
}