import React, { useEffect, useState, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Button,
    Animated,
    TextInput
} from 'react-native';

import MoodButton1 from '*/pics/happy.svg'
import MoodButton2 from '*/pics/slightHappy.svg'
import MoodButton3 from '*/pics/peace.svg'
import MoodButton4 from '*/pics/sad.svg'
import MoodButton5 from '*/pics/verySad.svg'
import { Marker } from 'react-native-svg';
import { Input } from '@arco-design/mobile-react';

const screenWidth = Dimensions.get('window').width;
// 计算屏幕和设计图的比例
const wlr = screenWidth / 360;

const screenHeight = Dimensions.get('window').height;
const data = [
    ["快乐", "满足", "热情", "激情", "自豪", "解脱", "放松", "克服恐惧", "拥有陪伴", "战胜emo", "打败恐惧"],
    ["疲惫", "焦虑", "抑郁", "恐惧", "孤独", "空虚", "内耗", "遇到困难", "与人争执"]

]

function RecordScreen({ navigation, route }: any): JSX.Element {
    let id = JSON.stringify(route.params.id);
    let selectedStyle;

    // 根据用户选择心情的不同展示不同的界面
    switch (id) {
        case '1':
            selectedStyle = styles.scollStyle1;
            break;
        case '2':
            selectedStyle = styles.scollStyle2;
            break;
        case '3':
            selectedStyle = styles.scollStyle3;
            break;
        case '4':
            selectedStyle = styles.scollStyle4;
            break;
        case '5':
            selectedStyle = styles.scollStyle5;
            break;

    }
    const [tagGroup1State, setTagGroup1State] = useState(Array(data[0].length).fill(false));
    const [tagGroup2State, setTagGroup2State] = useState(Array(data[1].length).fill(false));
    const [inputText, onChangeText] = useState('记录下你此刻的想法');

    let scaleAnimationSet1 = new Array(data[0].length).fill(0).map(() => useRef(new Animated.Value(1)).current);
    let scaleAnimationSet2 = new Array(data[1].length).fill(0).map(() => useRef(new Animated.Value(1)).current);

    const handleTagGroup1Press = (index: number) => {
        const newTagGroup1State = [...tagGroup1State];
        newTagGroup1State[index] = !newTagGroup1State[index];
        setTagGroup1State(newTagGroup1State);
        handleAnimation(index, 1);
    }
    const handleTagGroup2Press = (index: number) => {
        const newTagGroup2State = [...tagGroup2State];
        newTagGroup2State[index] = !newTagGroup2State[index];
        setTagGroup2State(newTagGroup2State);
        handleAnimation(index, 2);
    }

    const handleAnimation = (index: number, type: number) => {
        if (type === 1)
            scaleAnimationSet1[index].setValue(0.85);
        else
            scaleAnimationSet2[index].setValue(0.85);
        Animated.sequence([
            Animated.spring(type === 1 ? scaleAnimationSet1[index] : scaleAnimationSet2[index],
                {
                    toValue: 1,
                    friction: 3,    //弹跳系数
                    tension: 45,   // 控制速度
                    useNativeDriver: true
                }),
        ]).start();
    };

    return (
        <ScrollView style={selectedStyle}>
            <View style={styles.contentContainer}>
            {/* <View style={styles.picStyle}>
                {
                    id === '1' ? <MoodButton1 width={0.12*screenHeight} /> :
                        id === '2' ? <MoodButton2 width={wlr * 135} height={wlr * 135} /> :
                            id === '3' ? <MoodButton3 width={wlr * 135} height={wlr * 135} /> :
                                id === '4' ? <MoodButton4 width={wlr * 135} height={wlr * 135} /> :
                                    <MoodButton5 width={wlr * 50} height={wlr * 135} />}
            </View> */}
            <Text style={styles.header}>具体描述一下当下心情吧</Text>
            <View style={styles.wordsContainer}>{
                data[0].map((value, index) =>
                    <TouchableOpacity key={`group1_${index}`} activeOpacity={0.7} onPress={() => handleTagGroup1Press(index)} >
                        <Animated.Text style={[
                            tagGroup1State[index] === false ? styles.word : styles.word_selected,
                            {
                                transform: [{ scale: scaleAnimationSet1[index] }]
                            }
                        ]}>
                            {value}
                        </Animated.Text>
                    </TouchableOpacity>)
            }</View>
            <View style={[styles.wordsContainer,{marginTop: 0.05*screenHeight}]}>{
                data[1].map((value, index) =>
                    <TouchableOpacity key={`group2_${index}`} activeOpacity={0.7} onPress={() => handleTagGroup2Press(index)} >
                        <Animated.Text style={[
                            tagGroup2State[index] === false ? styles.word : styles.word_selected,
                            {
                                transform: [{ scale: scaleAnimationSet2[index] }]
                            }
                        ]}>
                            {value}
                        </Animated.Text>
                    </TouchableOpacity>)
            }</View>
            <View style={{alignSelf: 'flex-start', marginLeft:0.1*screenWidth,marginTop: 0.03*screenHeight}}>
                <Text style={{color: 'white',fontSize: 17}}>{"我还想说"}</Text>
                <TextInput onChangeText={ text =>} ></TextInput>
            </View>
            <TouchableOpacity activeOpacity={0.5} ><Text style={styles.confirmButton}>{"完成"}</Text></TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    picStyle:{
        position: 'absolute',
        marginTop: 0.01* screenHeight
    },
    scollStyle1: {
        backgroundColor: '#6BB234'
    },
    scollStyle2: {
        backgroundColor: '#4B700F'
    },
    scollStyle3: {
        backgroundColor: '#C89532'
    },
    scollStyle4: {
        backgroundColor: '#60D0D7'
    },
    scollStyle5: {
        backgroundColor: '#326ABE'
    },
    header: {
        fontSize: 28,
        color: "white",
        textAlign: 'center',
        marginTop: 0.2*screenHeight
    },
    contentContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    wordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingHorizontal: 16*wlr,
        marginHorizontal: 20*wlr,
        marginTop: 0.1 * screenHeight
    },
    word: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 100*wlr,
        paddingVertical: 3*wlr,
        paddingHorizontal: 10*wlr,
        marginBottom: 10*wlr,
        marginRight: 10*wlr,
        color: 'white',
    },
    word_selected: {
        backgroundColor: "rgba(255, 97, 44,0.8)",
        borderRadius: 100*wlr,
        paddingVertical: 3*wlr,
        paddingHorizontal: 10*wlr,
        marginBottom: 10*wlr,
        marginRight: 10*wlr,
        color: 'white',
    },
    confirmButton:{
        fontSize: 18,
        backgroundColor: "rgb(255, 181, 0)",
        paddingVertical: 6*wlr,
        paddingHorizontal:20*wlr,
        borderRadius: 100*wlr,
        width: 0.5*screenWidth,
        textAlign: "center",
        marginTop: 0.03*screenHeight,
        color: "white",
        fontWeight: 'bold'

    }
})

export default RecordScreen;