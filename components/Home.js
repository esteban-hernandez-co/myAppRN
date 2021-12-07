import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ThemeColours } from './ThemeColours';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

// screens to show in Home
import { Settings } from './Settings'

import { ClientMain } from './ClientMain';

import { AddJob } from './AddJob'
import { JobDetails } from './JobDetails'
import { JobList } from './JobList'



import { Signout } from './Signout';
import { ClientList } from './ClientList';


const Tab = createBottomTabNavigator()

export function Home ( props ) {
    const navigation = useNavigation()
    const [ listDataClient, setlistDataClient ] = useState()
    const [ listDataJob, setlistDataJob ] = useState()
    
    

    const AddJobHandler = () => { props.AddJob }
    const AddClientHandler = () => { props.AddClient }
    //const getClientDetail = () => { props.getClientDetail}

    
  
    useEffect( () => {
     if(!props.auth) {
      navigation.reset({ index: 0, routes: [ {name: 'Signin'} ] })
     }
     //console.log( props.user )
    }, [props.auth])
  
    useEffect( () => {
      setlistDataClient( props.dataClient )
      
    }, [props.dataClient])

    useEffect( () => {
      setlistDataJob( props.dataJob )
    }, [props.dataJob])
  

    const data = { time: new Date().getTime(), user: Math.random() * 100 }
    const onAddClient = () => {
      navigation.navigate('AddClient', {
        handler: AddJobHandler})
    }
    
    const onAddJob = () => {
      navigation.navigate('AddJob', {
        handler: AddJobHandler})
    }
    
  
  
    return(
        
        <Tab.Navigator screenOptions={{headerShown:true}}>
          <Tab.Screen
            name="Jobs" 
            options={{
            
            tabBarLabel: "Jobs",
            tabBarIcon: ({color,size}) => (
              <Ionicons name="document" color={color} size={size} />
            ),
            headerRight: ({color,size}) => (
              <TouchableOpacity onPress={ () => onAddJob }>
                <Text style={styles.buttonAdd}>Add</Text>
              </TouchableOpacity>
            ),
          }}
        >
          { (props) => <JobList {...props} data={listDataJob} /> }
        </Tab.Screen>

        {/*main screen for Clients */}
        {/*}
        <Tab.Screen
            name="ClientMain" 
            options={{
              tabBarLabel: "Client",
              tabBarIcon: ({color,size}) => (
                <Ionicons name="body-outline" color={color} size={size} />
              )
            }}
            children={() => 
              <ClientMain {...props}
                handler={props.AddClient} 
                data={listDataClient}
                getClientDetail = {props.getClientDetail}
              />
            }
          >
          
          </Tab.Screen>
          */}
        <Tab.Screen
            name="ClientList" 
            options={{
              headerTitle: "Clients",
              tabBarLabel: "Clients",
              
              tabBarIcon: ({color,size}) => (
                <Ionicons name="body" color={color} size={size} />
              ),
              headerRight: ({color,size}) => (
                <TouchableOpacity onPress={ () => onAddClient() }>
                  <Text style={styles.buttonAdd}>Add</Text>
                </TouchableOpacity>
              ),
            }}
            children={() => 
              <ClientList {...props}
                handler={props.AddClient} 
                data={listDataClient}
                getClientDetail = {props.getClientDetail}
              />
            }
          >
          
        </Tab.Screen>
        
        {/*Settings screen*/}
        <Tab.Screen 
          name="Settings"           
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({color,size}) => (
              <Ionicons name="settings" color={color} size={size} />
              
            )
          }}
          children={() => 
            <Settings {...props} 
              SignoutHandler={props.SignoutHandler}
              user = {props.user}
            />}
        >
         
        </Tab.Screen>
        
    </Tab.Navigator>
    /*
        <View >
            <Text></Text>
            <TouchableOpacity style={styles.button} onPress={ () => { props.add('cities', data ) }}>
            <Text>Add something</Text>
            </TouchableOpacity>
            <FlatList data={ listDataClient } renderItem={ renderItem} keyExtractor={item => item.id} />
        </View>
      */ 
      
    )
  }
  
  const styles = StyleSheet.create({
    screen : {
        display: "flex",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: 40,
    },
    button: {
      backgroundColor: ThemeColours.turquoise,
      padding: 10,
    },
    item: {
      padding: 10,
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
    },
    buttonAdd: {
      color: "black",
      padding: 10,
    },
  })