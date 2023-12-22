import React, { useState } from 'react';
import Drawer from 'react-native-drawer'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
    Image,
    Pressable,
    TouchableOpacity,
    DrawerLayoutAndroid,
    Button
} from 'react-native';
import MoodButton1 from '*/pics/happy.svg'
import MoodButton2 from '*/pics/slightHappy.svg'
import MoodButton3 from '*/pics/peace.svg'
import MoodButton4 from '*/pics/sad.svg'
import MoodButton5 from '*/pics/verySad.svg'


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
// 计算屏幕和设计图的比例
const wlr = screenWidth / 414;

type MoodType ={
    navigation: any,
    id: number,
}


/**
 * 
 * @param navigation 
 * @returns 
 * @description 用户首页界面上选择自己心情的一个按钮，通过它进入RecordScreen
 */
function Mood({navigation,id }: MoodType): JSX.Element {

    const handleDrawerEvent = () => {
        navigation.navigate('Record',{id:id})
    }
    return (
        <TouchableOpacity onPress={handleDrawerEvent} activeOpacity={0.5}>
            {  
                id === 1 ?  <MoodButton1 width={wlr * 50} height={wlr * 50} />:
                id === 2 ?  <MoodButton2 width={wlr * 50} height={wlr * 50} />:
                id === 3 ?  <MoodButton3 width={wlr * 50} height={wlr * 50} />:
                id === 4 ?  <MoodButton4 width={wlr * 50} height={wlr * 50} />:
                <MoodButton5 width={wlr * 50} height={wlr * 50} />
            }
        </TouchableOpacity >
    );
}

function HomeScreen({navigation}:any): JSX.Element {
    return (
        <ScrollView style={styles.box}>
            <Text style={styles.headTitle}>每日心情打卡</Text>
            <View style={styles.moodSelectionBox}>
                <Text style={styles.innerTitle}>选择此刻你的心情</Text>
                <View style={styles.buttonContainer}>
                    <Mood navigation={navigation} id={1} />
                    <Mood navigation={navigation} id={2}/>
                    <Mood navigation={navigation} id={3}/>
                    <Mood navigation={navigation} id={4}/>
                    <Mood navigation={navigation} id={5}/>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    headTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "tomato",
    },
    moodSelectionBox: {
        backgroundColor: "#FFE5B1",
        height: 150,
        width: screenWidth - 2 * 20,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        gap: wlr * 13,
        paddingHorizontal: 10, // 设置水平方向的内边距
        paddingVertical: 20,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    box: {
        padding: 20,
    },
    innerTitle: {
        marginTop: 10,
        marginBottom: 13,
        fontSize: 15
    },
    drawerStyles: {
        shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3
    }

})

export default HomeScreen;