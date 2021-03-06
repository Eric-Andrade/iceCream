import React, { useState, useEffect, useContext, useRef, memo } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Animated, Easing } from 'react-native'
import { ETASimpleText } from '@etaui'

const Root = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    min-height: 20px;
    min-width: 90px;
	background-color: transparent;
`
const Radio = styled.View`
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: ${(props) => (props.sizeRadio ? props.sizeRadio : 30)}px;
	height: ${(props) => (props.sizeRadio ? props.sizeRadio : 30)}px;
	border-radius: ${(props) => (props.sizeRadio ? props.sizeRadio / 2 : 30 / 2)}px;
	border-width: 0.75px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	margin: 0px 5px;
	z-index: 1000;
	background-color: transparent;
`
const Touchable = styled.TouchableHighlight.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
    flex-direction: row;
	align-items: center;
    justify-content: flex-start;
`

const ETARadio = memo(({ sizeRadio, colorRadio, onChange, activated, text, sizeText, colorText }) => {
	const animation = useRef(new Animated.Value(activated ? 1 : 0)).current
    
    useEffect(() => {
        let isUnMounted = false
        if (activated) {
            // console.log('activated');
            Animated.timing(animation, {
				duration: 200,
				toValue: 1,
				easing: Easing.materialUIStandard,
				useNativeDriver: true,
			}).start()
		} else {
            console.log('!activated');
			Animated.timing(animation, {
				duration: 200,
				toValue: 0,
				easing: Easing.materialUIStandard,
				useNativeDriver: true,
			}).start()
        }
        
		return () => {
			isUnMounted = true
		}
    }, [activated])

	return (
		<Root>
			<Touchable
				onPress={() => onChange()}
                >
                <>
                    <Radio 
                        activated={activated}
                        sizeRadio={sizeRadio}
                        colorRadio={colorRadio}
                        >
                        <Animated.View
                            style={[
                                {
                                    height: sizeRadio - 4,
                                    width: sizeRadio - 4,
                                    borderRadius: sizeRadio / 2,
                                    backgroundColor:
                                        activated ? colorRadio : 'transparent',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    transform: [
                                        {
                                            scaleX: animation.interpolate(
                                                {
                                                    inputRange: [0,1],
                                                    outputRange: [0, 1],
                                                },
                                            ),
                                        },
                                        {
                                            scaleY: animation.interpolate(
                                                {
                                                    inputRange: [0,1],
                                                    outputRange: [0, 1],
                                                },
                                            ),
                                        },
                                    ],
                                },
                            ]}
                        />
                    </Radio>
                    <ETASimpleText
                        size={sizeText}
                        color={colorText}
                        weight='300'
                        align='left'>
                        {text}
                    </ETASimpleText>
                </>
			</Touchable>
		</Root>
	)
})

export default ETARadio
