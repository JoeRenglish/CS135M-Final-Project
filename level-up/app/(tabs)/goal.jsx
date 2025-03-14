import { Text, View, StyleSheet, StatusBar, Pressable, FlatList } from "react-native";
import { useState, useContext, useEffect } from "react";
import { goalData } from "@/data/goalsData";
import { userData } from "@/data/userData";
import { rewardData } from "@/data/rewardsData";

export default function Goals() {
  return (
    <View style={styles.container}>
      <StatusBar style={styles.statusbar}></StatusBar>

      {/* ------------------ Level Bar ------------------*/}
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
      <View>
        <Text>This is the goals screen.</Text>
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
    width: '50%'
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
  }
})