import React, {useState, useEffect, useContext, useRef} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {StyleSheet} from 'react-native'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import {useRoute} from '@react-navigation/native'
import {Pointer} from '@commons/MapMaprkers'
import SearchBoxComponent from './SearchBoxComponent'
import UbicationDetailsComponent from './UbicationDetailsComponent'

const Root = styled.View`
	flex: 1;
`

const MapAddressesComponent = () => {
	const themeContext = useContext(ThemeContext)
	const route = useRoute()
	const {data} = route.params
	const [getLatitude, setgetLatitude] = useState()
	const [getLongitude, setgetLongitude] = useState()
	const [getLatitudeDelta] = useState(0.015)
	const [getLongitudeDelta] = useState(0.0121)
	const map = useRef(null)

	useEffect(() => {
		let isSubscribed = true
		if (data !== null) {
			setgetLatitude(data.latitude)
			setgetLongitude(data.longitude)
		} else {
			_findCoordinates()
		}
		return () => (isSubscribed = false)
	}, [data])

	const _findCoordinates = async () => {
		await Geolocation.getCurrentPosition(
			(position) => {
				setgetLatitude(position.coords.latitude)
				setgetLongitude(position.coords.longitude)
				// console.log(position.coords.latitude);
			},
			(error) => console.warn('ewe', error.message),
			{
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000,
			},
		)
	}

	return (
		<Root style={{...StyleSheet.absoluteFillObject}}>
			{getLatitude ? (
				<MapView
					// ref={(map) => {this.map = map}}
					ref={map}
					// provider={PROVIDER_GOOGLE}
					style={{
						...StyleSheet.absoluteFillObject,
					}}
					customMapStyle={themeContext.MAPSTYLE}
					region={{
						latitude: getLatitude,
						longitude: getLongitude,
						latitudeDelta: getLatitudeDelta,
						longitudeDelta: getLongitudeDelta,
					}}
					// initialRegion={{
					// 	latitude: 37.78825,
					// 	longitude: -122.4324,
					// 	latitudeDelta: 0.0922,
					// 	longitudeDelta: 0.0421,
					//   }}
				/>
			) : null}
			<Pointer
				background={
					themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
				}
			/>
			<SearchBoxComponent
				currentPosition={() => _findCoordinates()}
			/>
			<UbicationDetailsComponent
				headTitle={data ? data.headTitle : 'New address'}
				details={
					data
						? data.details
						: 'Select where would like we deliver you our products'
				}
			/>
		</Root>
	)
}

export default React.memo(MapAddressesComponent)
