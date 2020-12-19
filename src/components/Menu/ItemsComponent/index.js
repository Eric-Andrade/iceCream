import React, { useState, useEffect, useContext, memo } from 'react'
import { Animated, Platform } from 'react-native'
import styled, { ThemeContext } from 'styled-components'
import { ETASimpleText, ETALoader } from '@etaui'
import GeneralItemComponent from '@components/Menu/GeneralItemComponent'
import FilterModal from '@commons/FilterModal'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST as GET_ITEMS_BY_CATEGORY_REQUEST } from '@redux/menu/categories/itemsbycategory/actions'
import { ADD_FILTERS, TOGGLE_MODAL, GET_DATA_REQUEST, DELETE_FILTERS } from '@redux/menu/filters/actions'

const Root = styled.View`
	flex: 1;
	justify-content: center;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const CategoryItemsList = styled.FlatList``

const mapStateToProps = (state, props) => {
	const itemsbycategory = state.itemsbycategory.data
	const { data, toggle_modal, increment, discountToggle } = state.filters
	return { itemsbycategory, data, toggle_modal, increment, discountToggle }
}

const mapDispatchProps = (dispatch, props) => ({
	addFilters: ({ title, active }, { discounts }) => {
		// console.log({ title, active }, { discounts });
		dispatch({
			type: ADD_FILTERS,
			payload: {
				paramItem: { title, active },
				discounts,
				discountToggle: false
			}
		})
	},

	toggleModal: (toggle_modal) => {
		dispatch({
            type: TOGGLE_MODAL,
            payload: {
				toggle_modal,
			}
		})
	},

	// All filters
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
			payload: {}
		})
	},

	getDataRequestItems: () => {
		dispatch({
			type: GET_ITEMS_BY_CATEGORY_REQUEST,
			payload: {
				id: 1
			}
		}) 
	},
	
	deleteFilters: () => {
		dispatch({
			type: DELETE_FILTERS,
			payload: {}
		})
	},
})

const ItemsComponent = memo(({ toggleModal, toggle_modal, addFilters, getDataRequest, data, deleteFilters, getDataRequestItems, itemsbycategory, increment, discountToggle }) => {
	const themeContext = useContext(ThemeContext)
	const [ isTopModalVisible, setisTopModalVisible ] = useState(false)
	const [ dynamicItems, setdynamicItems ] = useState(null)
	const [ animatedValueTransform ] = useState(new Animated.Value(0))
	const [ opacity ] = useState(new Animated.Value(0))
	let delayValue = 700
	let _data = []
	let _discounts = []
	let sorted = []
	
    useEffect(() => {
        // setincrementchecked(increment)
        console.log('[i] increment: value', {increment, discountToggle});
	}, [increment, discountToggle])	

	useEffect(() => {
		let isUnMounted = false
		setisTopModalVisible(toggle_modal)
		
		return () => {
			isUnMounted = true
		}
	}, [toggle_modal])

	useEffect(() => {
		let isUnMounted = false
		if (increment !== undefined && increment === true && dynamicItems !== null) {
			if(Array.isArray(dynamicItems)) {
				// increment
				sorted = dynamicItems.sort((a, b) => parseFloat(a.discount !== 0 ? ((100 - a.discount) * a.price) / 100 : a.price) - parseFloat(b.discount !== 0 ? ((100 - b.discount) * b.price) / 100 : b.price))
				setdynamicItems(sorted)
				// console.log('*************[ItemsComponent] if: ',{ increment,  dynamicItems: dynamicItems.length} )
			}
		} else if (increment !== undefined && increment === false && dynamicItems !== null) {
			if(Array.isArray(dynamicItems)) {
				// decremental
				sorted = dynamicItems.sort((a, b) => parseFloat(b.discount !== 0 ? ((100 - b.discount) * b.price) / 100 : b.price) - parseFloat(a.discount !== 0 ? ((100 - a.discount) * a.price) / 100 : a.price))
				setdynamicItems(sorted)
				// console.log('*************[ItemsComponent] else: ',{ increment,  dynamicItems: dynamicItems.length} )
			}
		} else {
			console.log('ninguno');
			// setdynamicItems(itemsbycategory)
		}

		return () => {
			isUnMounted = true
		}
	}, [itemsbycategory, dynamicItems, increment])

	useEffect(() => {
		let isUnMounted = false
		deleteFilters()
		getDataRequestItems()
		if (itemsbycategory.length > 0) {
			// setdynamicItems(itemsbycategory)
			Animated.spring(animatedValueTransform, {
				toValue: 1,
				tension: 5,
				useNativeDriver: true,
			}).start()

			Animated.timing(opacity, {
				toValue: 1,
				duration: 700,
				useNativeDriver: true,
			}).start()

			itemsbycategory.forEach(element => {
				_data.unshift(element.status)
				if (element.discount !== '' && element.discount !== undefined) {
					_discounts.unshift(element.discount)
				}
			})

			if (_data.length !== 0) {
				let uniques = [...new Set(_data)]
				uniques.forEach(element => {
					if (element !== '' && element !== undefined && _discounts.length > 0) {
						addFilters({ title: element, active: false }, { discounts: true })
					} else if (element !== '' && element !== undefined && _discounts.length === 0) {
						addFilters({ title: element, active: false }, { discounts: false })
					}
				})
			}
		}
		
		return () => {
			isUnMounted = true
		}
	}, [itemsbycategory])

	useEffect(() => {
		let isUnMounted = false
		getDataRequest()
		// console.log('[ItemsComponent] discountToggle: ', discountToggle);
		// Filters
		if (itemsbycategory.length > 0) {
			let actives = []
			data.forEach(element => {
				if (element.active === true) {
					actives.unshift(element.title)
				}
			})

			let arrayFilters = []
			if (actives.length > 0) {

				function filterItems(query) {
					// console.log('functionfilterItems > 0');
					return itemsbycategory.filter((el, i) => {
						return el.status === query
					})
				}

				actives.forEach((element, i) => {
					arrayFilters.unshift(...filterItems(element))
				})

				if (increment !== undefined && increment === true) {
					let sorted = arrayFilters.sort((a, b) => parseFloat(a.discount !== 0 ? ((100 - a.discount) * a.price) / 100 : a.price) - parseFloat(b.discount !== 0 ? ((100 - b.discount) * b.price) / 100 : b.price))
					setdynamicItems(sorted)
				} else if (increment !== undefined && increment === false) {
					let sorted = arrayFilters.sort((a, b) => parseFloat(b.discount !== 0 ? ((100 - b.discount) * b.price) / 100 : b.price) - parseFloat(a.discount !== 0 ? ((100 - a.discount) * a.price) / 100 : a.price))
					setdynamicItems(sorted)
				} else {
					console.log('else :(', increment);
					// setdynamicItems(itemsbycategory)
					setdynamicItems(arrayFilters)
				}

			} else if (discountToggle) {
				console.log('++++++++ functionfilterItems discountToggle true');
				function filterItems(query) {
					return dynamicItems.filter((el, i) => {
						return el.discount !== query
					})
				}
				setdynamicItems(filterItems(0))
			} 
			else {
				setdynamicItems(itemsbycategory)
			}
		}
		
		return () => {
			isUnMounted = true
		}
	}, [data, increment, discountToggle])

	return (
		<>
			<FilterModal
				isVisible={isTopModalVisible}
				onSwipeComplete={() => toggleModal(false)}
				closeModal={() => toggleModal(false)}
			/>
			<Root>
				{
					dynamicItems !== null
					?	<CategoryItemsList
							contentContainerStyle={{
								flexDirection: 'column',
								alignSelf: 'center',
							}}
							data={dynamicItems}
							keyExtractor={(item) => item._id.toString()}
							horizontal={!true}
							numColumns={2}
							initialNumToRender={2}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							ListEmptyComponent={() => (
								<ETASimpleText
									size={14}
									weight={
										Platform.OS === 'ios' ? '400' : '300'
									}
									color={
										themeContext.PRIMARY_TEXT_COLOR_LIGHT
									}
									align='left'>
									Empty list
								</ETASimpleText>
							)}
							renderItem={({item}) => {
								// console.log('item.price: ', item.price);
								delayValue += 700
								const translateY = animatedValueTransform.interpolate(
									{
										inputRange: [0, 1],
										outputRange: [delayValue, 1],
										extrapolate: 'clamp',
									},
								)
								return (
									<Animated.View
										style={{
											opacity,
											transform: [
												{
													translateY,
												},
											],
										}}>
										<GeneralItemComponent item={item} />
									</Animated.View>
								)
							}}
						/>
					:	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
				}
			</Root>
		</>
	)
})

const ItemsComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps
)(ItemsComponent)
export default ItemsComponentConnect
