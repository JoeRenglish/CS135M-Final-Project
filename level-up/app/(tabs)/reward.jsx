import { Text, View, Button, StyleSheet, StatusBar, Pressable, FlatList, TextInput } from "react-native";
import { useState, useContext, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import { goals } from "@/data/goalsData";
import { user } from "@/data/userData";
import { rewards } from "@/data/rewardsData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Rewards() {
  const [userData, setUser] = useState([]);
  const [level, setLevel] = useState();
  const [experience, setExperience] = useState();
  const [levelExperience, setLevelExperience] = useState();

  const [rewardData, setRewards] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [levelRequired, setLevelRequired] = useState();

  const router = useRouter();
  
  {/* ------------------ Get Reward Data From Async Storage ------------------ */}
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("LevelUp");
        const storageRewards = jsonValue != null ? JSON.parse(jsonValue) : null;
        
        if (storageRewards && storageRewards.length) {
          setRewards(storageRewards.sort((a, b) => b.id - a.id));
        } else {
          setRewards(rewards.sort((a, b) => b.id - a.id));
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchRewards();
  }, [rewards]);

{/* ------------------ Get User Data From Async Storage ------------------ */}
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("LevelUp");
        const storageUsers = jsonValue != null ? JSON.parse(jsonValue) : null;
        
        if (storageUsers && storageUsers.length) {
          setUser(storageUsers.sort((a, b) => b.id - a.id));
        } else {
          setUser(user.sort((a, b) => b.id - a.id));
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchUser();
  }, [user]);

  {/* ------------------ Store Goal Data in Async Storage ------------------ */}
  useEffect(() => {
    const storeReward = async () => {
      try {
        const jsonValue = JSON.stringify(rewardData);
        await AsyncStorage.setItem("LevelUp", jsonValue);
      } catch (e) {
        console.error(e);
      }
    } 
    storeReward();
  }, [rewardData]);

  useEffect(() => {
    const storeUser = async () => {
      try {
        const jsonValue = JSON.stringify(userData);
        await AsyncStorage.setItem("LevelUp", jsonValue);
      } catch (e) {
        console.error(e);
      }
    } 
    storeUser();
  }, [userData]);


  
  const addReward = () => {
    if (title.trim() && description.trim()) {
      const newId = rewardData.length > 0 ? rewardData[0].id + 1 : 1;
      setRewards([{ id: newId, title: title, description: description, levelRequired: levelRequired }, ...rewardData]);
      setTitle('');
      setDescription('');
      setLevelRequired();
    }
  }

  

  const removeReward = (id) => {
    setRewards(rewardData.filter(reward => reward.id !== id));
  }

  const updateUser = (id) => {
    setUser(userData.map(u => u.id === id ? {level: u.level, levelExperience: u.levelExperience, experience: u.experience } : u))
  }



  const renderItem = ({ item }) => (
    <View style={{ borderColor: 'black', borderWidth: 1, height: 100, marginTop: 10, padding: 10}}>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{item.levelRequired}</Text>
      <Pressable onPress={() => removeReward(item.id)}>
        <Text>Delete</Text>
      </Pressable>
    </View>
  )

  return (
    
    <View style={styles.container}>
      <StatusBar style={styles.statusbar}></StatusBar>

      {/* ------------------ Level Bar ------------------ */}
      <View style={styles.levelbar}>
        <View style={styles.levelIndicator}>
          <Text style={styles.levelText}>Level</Text>
          <View style={styles.levelCircle}>
            <Text style={styles.levelText}>1</Text>
          </View>
        </View>
        <View style={styles.experienceBar}>
          <View style={styles.expBuffer}></View>
          <Text style={styles.goalText}>Next Reward at Level 2:</Text>
          <Text style={styles.goalText}></Text>
          <View style={styles.experienceAmount}>
            <View style={styles.barFill}></View>
          </View>
          <Text style={styles.experienceText}>0/1260 EXP</Text>
        </View>
      </View>

      {/* ------------------ Main Content ------------------ */}
      
      <View style={[styles.fixedView]}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Add a new Reward</Text>
        <TextInput 
          placeholder="Name your reward"
          placeholderTextColor="gray"
          value={title}
          onChangeText={setTitle} 
          style={styles.inputBox}/>
        <TextInput 
          placeholder="Describe your reward"
          placeholderTextColor="gray"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={3}
          style={[styles.inputBox, {height: 70}]}/>
          <TextInput 
          placeholder="Set your reward level goal"
          placeholderTextColor="gray"
          value={levelRequired}
          onChangeText={setLevelRequired}
          numberOfLines={1}
          style={styles.inputBox }/>
        <View style={{alignItems: 'center'}}>
          <View style={{borderWidth: 1, borderRadius: 10, marginTop: 5, width: 150}}>
            <Button title="Add Reward" onPress={addReward} />
          </View>
        </View>
      </View>

      <View style={{height: 415, paddingLeft: 10, paddingRight: 10}}>
        <FlatList
          data={rewardData}
          renderItem={renderItem}
          keyExtractor={reward => reward.id}
          contentContainerStyle={{ flexGrow: 1}} 
        />
      </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  levelbar: {
    width: '100%',
    height: '20%',
    backgroundColor: '#171825',
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  expBuffer: {
    marginTop: 50
  },
  experienceBar: {
    justifyContent: 'center',
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
    margin: 10,
  },
  experienceAmount: {
    borderWidth: 3,
    marginTop: 5,
    height: 30,
    width: '100%',
    borderColor: '#2c2d3a'
  },
  barFill: {
    backgroundColor: '#2c2d3a',
    height: '100%',
    width: '0%'
  },
  goalText: {
    color: '#f1f1f1',
    textAlign: 'center',
    marginTop: 5,
    width: '100%',
    marginLeft: -40
  },
  experienceText: {
    color: '#f1f1f1',
    textAlign: 'right',
    marginTop: 5,
    width: '100%'
  },
  levelIndicator: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 5,
    flex: 1
  },
  levelCircle: {
    backgroundColor: '#2c2d3a',
    borderRadius: '50%',
    marginTop: 5,
    justifyContent: 'center',
    width: 55,
    height: 55
  },
 
  statusbar: {
    color: '#fff',
  },
  levelText: {
    color: '#f1f1f1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    textAlignVertical: "top",
  },
  fixedView: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
    width: '100%',
    padding: 10
  }
});